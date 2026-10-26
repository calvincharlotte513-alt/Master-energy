import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DepartmentId, TimeOfDay } from '../../types/hub';
import { Sun, Sunset, Moon, Video, Compass, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface CampusCanvasProps {
  activeDepartment: DepartmentId | null;
  onSelectDepartment: (deptId: DepartmentId) => void;
}

interface SectorFocus {
  pos: THREE.Vector3;
  target: THREE.Vector3;
}

const SECTOR_CAMERAS: Record<string, SectorFocus> = {
  'overview': {
    pos: new THREE.Vector3(18, 16, 24),
    target: new THREE.Vector3(0, 1, 0)
  },
  'oil-gas': {
    pos: new THREE.Vector3(3, 4, 11),
    target: new THREE.Vector3(0, 1.2, 4)
  },
  'kitchen': {
    pos: new THREE.Vector3(-9, 4, 6),
    target: new THREE.Vector3(-6, 1.5, 0)
  },
  'lounge': {
    pos: new THREE.Vector3(-6, 5, -3),
    target: new THREE.Vector3(-4, 2.5, -6)
  },
  'carwash': {
    pos: new THREE.Vector3(12, 4, 3),
    target: new THREE.Vector3(8, 1.5, -1)
  },
  'garden': {
    pos: new THREE.Vector3(8, 5, 10),
    target: new THREE.Vector3(5, 1, 5)
  },
  'leases': {
    pos: new THREE.Vector3(2, 3, -4),
    target: new THREE.Vector3(0, 1, -6)
  }
};

export const CampusCanvas: React.FC<CampusCanvasProps> = ({
  activeDepartment,
  onSelectDepartment
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('sunset');
  const [isCinematicTour, setIsCinematicTour] = useState<boolean>(false);
  const [hoveredDept, setHoveredDept] = useState<DepartmentId | null>(null);
  const [cameraModeLabel, setCameraModeLabel] = useState<string>('Overview Hub Perspective');

  // Three.js runtime refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const currentTargetRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 1, 0));
  const desiredPosRef = useRef<THREE.Vector3>(new THREE.Vector3(18, 16, 24));
  const desiredTargetRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 1, 0));
  const lightsRef = useRef<{
    ambient: THREE.AmbientLight;
    dir: THREE.DirectionalLight;
    canopyLights: THREE.PointLight[];
    gardenLights: THREE.PointLight[];
    neonGlow: THREE.PointLight;
  } | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const tourStepRef = useRef<number>(0);
  const tourTimerRef = useRef<number>(0);

  // Orbit controls state
  const isDraggingRef = useRef<boolean>(false);
  const prevMousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const sphericalRef = useRef<{ radius: number; theta: number; phi: number }>({
    radius: 32,
    theta: Math.PI / 4,
    phi: Math.PI / 3.5
  });

  // Time of day lighting updater
  const updateEnvironmentLighting = useCallback((time: TimeOfDay) => {
    if (!sceneRef.current || !lightsRef.current) return;
    const { ambient, dir, canopyLights, gardenLights, neonGlow } = lightsRef.current;

    if (time === 'day') {
      sceneRef.current.background = new THREE.Color(0xd6e6f2);
      sceneRef.current.fog = new THREE.FogExp2(0xd6e6f2, 0.015);
      ambient.color.setHex(0xffffff);
      ambient.intensity = 1.2;
      dir.color.setHex(0xfffaed);
      dir.intensity = 2.0;
      dir.position.set(20, 30, 15);
      canopyLights.forEach(l => (l.intensity = 0.5));
      gardenLights.forEach(l => (l.intensity = 0.2));
      neonGlow.intensity = 0.3;
    } else if (time === 'sunset') {
      sceneRef.current.background = new THREE.Color(0x1a1226);
      sceneRef.current.fog = new THREE.FogExp2(0x1a1226, 0.018);
      ambient.color.setHex(0xe5a870);
      ambient.intensity = 0.8;
      dir.color.setHex(0xff8c42);
      dir.intensity = 1.4;
      dir.position.set(25, 12, -20);
      canopyLights.forEach(l => (l.intensity = 1.6));
      gardenLights.forEach(l => (l.intensity = 1.4));
      neonGlow.intensity = 1.8;
    } else {
      // Night
      sceneRef.current.background = new THREE.Color(0x060913);
      sceneRef.current.fog = new THREE.FogExp2(0x060913, 0.022);
      ambient.color.setHex(0x1e2a47);
      ambient.intensity = 0.4;
      dir.color.setHex(0x3b82f6);
      dir.intensity = 0.5;
      dir.position.set(-15, 20, 15);
      canopyLights.forEach(l => (l.intensity = 2.4));
      gardenLights.forEach(l => (l.intensity = 2.2));
      neonGlow.intensity = 2.8;
    }
  }, []);

  // Update camera focus when department or state changes
  useEffect(() => {
    if (activeDepartment && SECTOR_CAMERAS[activeDepartment]) {
      const targetSector = SECTOR_CAMERAS[activeDepartment];
      desiredPosRef.current.copy(targetSector.pos);
      desiredTargetRef.current.copy(targetSector.target);
      setIsCinematicTour(false);
      setCameraModeLabel(`Focused: ${activeDepartment.toUpperCase()}`);
    } else if (!isCinematicTour) {
      desiredPosRef.current.copy(SECTOR_CAMERAS['overview'].pos);
      desiredTargetRef.current.copy(SECTOR_CAMERAS['overview'].target);
      setCameraModeLabel('Master Hub Overview');
    }
  }, [activeDepartment, isCinematicTour]);

  // Handle time of day changes
  useEffect(() => {
    updateEnvironmentLighting(timeOfDay);
  }, [timeOfDay, updateEnvironmentLighting]);

  // Main Three.js scene creation
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 500);
    camera.position.set(18, 16, 24);
    cameraRef.current = camera;

    // WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    // Lighting setup
    const ambient = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambient);

    const dirLight = new THREE.DirectionalLight(0xfff5e6, 1.6);
    dirLight.position.set(20, 25, 15);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 100;
    dirLight.shadow.camera.left = -25;
    dirLight.shadow.camera.right = 25;
    dirLight.shadow.camera.top = 25;
    dirLight.shadow.camera.bottom = -25;
    scene.add(dirLight);

    const canopyLights: THREE.PointLight[] = [];
    const canopyP1 = new THREE.PointLight(0xfff7ed, 1.8, 18);
    canopyP1.position.set(0, 3.8, 3);
    scene.add(canopyP1);
    canopyLights.push(canopyP1);

    const canopyP2 = new THREE.PointLight(0xfff7ed, 1.8, 18);
    canopyP2.position.set(0, 3.8, 6);
    scene.add(canopyP2);
    canopyLights.push(canopyP2);

    const gardenLights: THREE.PointLight[] = [];
    const gLight1 = new THREE.PointLight(0xffaa44, 1.5, 14);
    gLight1.position.set(5, 2.5, 5);
    scene.add(gLight1);
    gardenLights.push(gLight1);

    const neonGlow = new THREE.PointLight(0x0284c7, 2.0, 15);
    neonGlow.position.set(0, 5, 2);
    scene.add(neonGlow);

    lightsRef.current = {
      ambient,
      dir: dirLight,
      canopyLights,
      gardenLights,
      neonGlow
    };

    // ----------------------------------------------------
    // BUILD 3D ARCHITECTURAL ASSETS FOR MASTER ENERGY HUB
    // ----------------------------------------------------

    // 1. Ground Forecourt & Expressway
    const groundGeo = new THREE.PlaneGeometry(60, 60);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x181c24,
      roughness: 0.85,
      metalness: 0.1
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Road markings & Forecourt lines
    const markingsGeo = new THREE.PlaneGeometry(0.3, 3);
    const markMat = new THREE.MeshBasicMaterial({ color: 0xf8fafc });
    for (let i = -4; i <= 4; i += 2) {
      const mark = new THREE.Mesh(markingsGeo, markMat);
      mark.rotation.x = -Math.PI / 2;
      mark.position.set(i * 2.2, 0.02, 12);
      scene.add(mark);
    }

    // Concrete curb separator
    const curbGeo = new THREE.BoxGeometry(22, 0.25, 1);
    const curbMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.6 });
    const curb = new THREE.Mesh(curbGeo, curbMat);
    curb.position.set(0, 0.12, 9);
    curb.receiveShadow = true;
    scene.add(curb);

    // 2. FUEL FORECOURT (Master Energy Oil & Gas)
    // Mega Canopy
    const canopyRoofGeo = new THREE.BoxGeometry(14, 0.8, 10);
    const canopyMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.3,
      metalness: 0.7
    });
    const canopy = new THREE.Mesh(canopyRoofGeo, canopyMat);
    canopy.position.set(0, 4.5, 4.5);
    canopy.castShadow = true;
    scene.add(canopy);

    // Canopy LED fascia trim (Master Energy blue/gold glowing rim)
    const rimGeo = new THREE.BoxGeometry(14.2, 0.35, 10.2);
    const rimMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.8,
      roughness: 0.2
    });
    const canopyRim = new THREE.Mesh(rimGeo, rimMat);
    canopyRim.position.set(0, 4.5, 4.5);
    scene.add(canopyRim);

    // Canopy Pillars
    const pillarGeo = new THREE.CylinderGeometry(0.3, 0.3, 4.5, 16);
    const pillarMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.6, roughness: 0.3 });
    const pPositions = [
      [-4.5, 2.25, 2],
      [4.5, 2.25, 2],
      [-4.5, 2.25, 7],
      [4.5, 2.25, 7]
    ];
    pPositions.forEach(([x, y, z]) => {
      const p = new THREE.Mesh(pillarGeo, pillarMat);
      p.position.set(x, y, z);
      p.castShadow = true;
      scene.add(p);
    });

    // Fuel Dispenser Islands & Digital Pumps
    const pumpIslandGeo = new THREE.BoxGeometry(1.6, 0.25, 7);
    const islandMat = new THREE.MeshStandardMaterial({ color: 0xcbd5e1 });
    const islandLeft = new THREE.Mesh(pumpIslandGeo, islandMat);
    islandLeft.position.set(-2.5, 0.12, 4.5);
    scene.add(islandLeft);

    const islandRight = new THREE.Mesh(pumpIslandGeo, islandMat);
    islandRight.position.set(2.5, 0.12, 4.5);
    scene.add(islandRight);

    // Individual Fuel Dispensers with LED screens
    const pumpGeo = new THREE.BoxGeometry(0.8, 1.8, 0.8);
    const pumpMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.5 });
    const screenMat = new THREE.MeshBasicMaterial({ color: 0x22c55e });

    [
      [-2.5, 1, 2.8],
      [-2.5, 1, 6.2],
      [2.5, 1, 2.8],
      [2.5, 1, 6.2]
    ].forEach(([x, y, z]) => {
      const pump = new THREE.Mesh(pumpGeo, pumpMat);
      pump.position.set(x, y, z);
      pump.castShadow = true;
      scene.add(pump);

      // Digital Lit Meter Screen
      const scr = new THREE.Mesh(new THREE.PlaneGeometry(0.4, 0.25), screenMat);
      scr.position.set(x + (x < 0 ? 0.41 : -0.41), y + 0.3, z);
      scr.rotation.y = x < 0 ? Math.PI / 2 : -Math.PI / 2;
      scene.add(scr);
    });

    // Roadside Digital Pricing LED Totem Billboard (Highway Entry)
    const totemPylonGeo = new THREE.BoxGeometry(1.2, 6.5, 0.5);
    const totemPylonMat = new THREE.MeshStandardMaterial({
      color: 0x090d16,
      metalness: 0.8,
      roughness: 0.2
    });
    const totemPylon = new THREE.Mesh(totemPylonGeo, totemPylonMat);
    totemPylon.position.set(-8.5, 3.25, 10.5);
    totemPylon.castShadow = true;
    scene.add(totemPylon);

    // Totem digital price panels
    const ledScreenGeo = new THREE.PlaneGeometry(0.9, 3.6);
    const ledScreenMat = new THREE.MeshBasicMaterial({ color: 0x04060a });
    const ledScreen = new THREE.Mesh(ledScreenGeo, ledScreenMat);
    ledScreen.position.set(-8.5, 3.8, 10.76);
    scene.add(ledScreen);

    // PMS price bar (Neon Orange)
    const pmsBar = new THREE.Mesh(new THREE.PlaneGeometry(0.75, 0.4), new THREE.MeshBasicMaterial({ color: 0xf97316 }));
    pmsBar.position.set(-8.5, 4.8, 10.77);
    scene.add(pmsBar);

    // AGO price bar (Vibrant Green)
    const agoBar = new THREE.Mesh(new THREE.PlaneGeometry(0.75, 0.4), new THREE.MeshBasicMaterial({ color: 0x10b981 }));
    agoBar.position.set(-8.5, 4.0, 10.77);
    scene.add(agoBar);

    // DPK / LPG price bar (Cyan Blue)
    const gasBar = new THREE.Mesh(new THREE.PlaneGeometry(0.75, 0.4), new THREE.MeshBasicMaterial({ color: 0x38bdf8 }));
    gasBar.position.set(-8.5, 3.2, 10.77);
    scene.add(gasBar);

    // Totem orange neon halo light
    const totemLight = new THREE.PointLight(0xf97316, 1.4, 8);
    totemLight.position.set(-8.5, 4.5, 11.2);
    scene.add(totemLight);

    // ====================================================
    // REALISTIC FORECOURT ROAD MARKINGS (Orange bays & Zebra)
    // ====================================================
    const orangeStripeMat = new THREE.MeshBasicMaterial({ color: 0xf97316 });
    const whiteStripeMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

    // Orange safety boundary lines around pump lanes
    const bayLineGeo = new THREE.PlaneGeometry(0.12, 7.5);
    [-5.2, -0.6, 0.6, 5.2].forEach(lx => {
      const line = new THREE.Mesh(bayLineGeo, orangeStripeMat);
      line.rotation.x = -Math.PI / 2;
      line.position.set(lx, 0.02, 4.5);
      scene.add(line);
    });

    // Pedestrian Zebra crossing between forecourt & main entrance
    for (let z = 0; z < 6; z++) {
      const stripe = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 0.35), whiteStripeMat);
      stripe.rotation.x = -Math.PI / 2;
      stripe.position.set(-3, 0.02, 0.2 + z * 0.55);
      scene.add(stripe);
    }

    // ====================================================
    // 3D VEHICLES (Cars fueling at the pumps & Car Wash)
    // ====================================================
    const create3DCar = (colorHex: number, isSUV = false) => {
      const carGroup = new THREE.Group();
      const carMat = new THREE.MeshStandardMaterial({
        color: colorHex,
        metalness: 0.8,
        roughness: 0.2
      });
      const glassMat = new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        metalness: 0.9,
        roughness: 0.1,
        transparent: true,
        opacity: 0.85
      });
      const wheelMat = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.8 });
      const rimMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.8, roughness: 0.2 });

      // Lower Chassis
      const length = isSUV ? 3.4 : 3.0;
      const height = isSUV ? 0.75 : 0.6;
      const width = isSUV ? 1.6 : 1.45;
      const chassis = new THREE.Mesh(new THREE.BoxGeometry(width, height, length), carMat);
      chassis.position.y = height / 2 + 0.2;
      chassis.castShadow = true;
      carGroup.add(chassis);

      // Cabin roof & windows
      const cabinLength = length * 0.58;
      const cabinHeight = isSUV ? 0.65 : 0.5;
      const cabinWidth = width * 0.85;
      const cabin = new THREE.Mesh(new THREE.BoxGeometry(cabinWidth, cabinHeight, cabinLength), glassMat);
      cabin.position.set(0, height + cabinHeight / 2 + 0.18, -0.1);
      cabin.castShadow = true;
      carGroup.add(cabin);

      // 4 Wheels
      const wheelGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.22, 16);
      const wx = width / 2;
      const wz = length * 0.32;
      const wheelPositions = [
        [-wx, 0.32, -wz],
        [wx, 0.32, -wz],
        [-wx, 0.32, wz],
        [wx, 0.32, wz]
      ];
      wheelPositions.forEach(([x, y, z]) => {
        const tire = new THREE.Mesh(wheelGeo, wheelMat);
        tire.rotation.z = Math.PI / 2;
        tire.position.set(x, y, z);
        tire.castShadow = true;
        carGroup.add(tire);

        const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.23, 12), rimMat);
        hub.rotation.z = Math.PI / 2;
        hub.position.set(x, y, z);
        carGroup.add(hub);
      });

      // Headlights (Warm LED)
      const headlightMat = new THREE.MeshBasicMaterial({ color: 0xfffaed });
      const hl1 = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.12, 0.05), headlightMat);
      hl1.position.set(-width * 0.32, height * 0.6 + 0.2, length / 2 + 0.02);
      const hl2 = hl1.clone();
      hl2.position.x = width * 0.32;
      carGroup.add(hl1);
      carGroup.add(hl2);

      // Taillights (Red)
      const tailMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
      const tl1 = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.12, 0.05), tailMat);
      tl1.position.set(-width * 0.32, height * 0.6 + 0.2, -length / 2 - 0.02);
      const tl2 = tl1.clone();
      tl2.position.x = width * 0.32;
      carGroup.add(tl1);
      carGroup.add(tl2);

      return carGroup;
    };

    // Car 1: Silver SUV refueling at Island 1
    const suvCar = create3DCar(0x94a3b8, true);
    suvCar.position.set(-4.1, 0, 4.6);
    scene.add(suvCar);

    // Car 2: Midnight Blue Sedan refueling at Island 2
    const sedanCar = create3DCar(0x1e3a8a, false);
    sedanCar.position.set(0.9, 0, 4.4);
    scene.add(sedanCar);

    // Car 3: White Sedan inside Carwash Bay
    const washCar = create3DCar(0xf8fafc, false);
    washCar.position.set(9, 0, -1.0);
    scene.add(washCar);

    // ====================================================
    // 3D HUMAN FIGURES (Attendants & Customers)
    // ====================================================
    const create3DPerson = (shirtHex: number, pantsHex: number, isAttendant = false) => {
      const personGroup = new THREE.Group();
      const skinMat = new THREE.MeshStandardMaterial({ color: 0x5a3825, roughness: 0.7 });
      const shirtMat = new THREE.MeshStandardMaterial({ color: shirtHex, roughness: 0.6 });
      const pantsMat = new THREE.MeshStandardMaterial({ color: pantsHex, roughness: 0.7 });
      const shoesMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.8 });

      // Legs
      const legGeo = new THREE.CylinderGeometry(0.08, 0.07, 0.75, 8);
      const legL = new THREE.Mesh(legGeo, pantsMat);
      legL.position.set(-0.11, 0.38, 0);
      legL.castShadow = true;
      const legR = new THREE.Mesh(legGeo, pantsMat);
      legR.position.set(0.11, 0.38, 0);
      legR.castShadow = true;
      personGroup.add(legL);
      personGroup.add(legR);

      // Shoes
      const shoeGeo = new THREE.BoxGeometry(0.12, 0.1, 0.22);
      const shoeL = new THREE.Mesh(shoeGeo, shoesMat);
      shoeL.position.set(-0.11, 0.05, 0.03);
      const shoeR = new THREE.Mesh(shoeGeo, shoesMat);
      shoeR.position.set(0.11, 0.05, 0.03);
      personGroup.add(shoeL);
      personGroup.add(shoeR);

      // Torso
      const torsoGeo = new THREE.BoxGeometry(0.38, 0.65, 0.22);
      const torso = new THREE.Mesh(torsoGeo, shirtMat);
      torso.position.set(0, 1.05, 0);
      torso.castShadow = true;
      personGroup.add(torso);

      // Safety reflector stripe for pump attendants
      if (isAttendant) {
        const stripe = new THREE.Mesh(
          new THREE.BoxGeometry(0.4, 0.08, 0.24),
          new THREE.MeshBasicMaterial({ color: 0xfacc15 })
        );
        stripe.position.set(0, 1.1, 0);
        personGroup.add(stripe);
      }

      // Head
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.14, 12, 12), skinMat);
      head.position.set(0, 1.5, 0);
      head.castShadow = true;
      personGroup.add(head);

      // Safety Cap / Hair
      const capMat = new THREE.MeshStandardMaterial({ color: isAttendant ? 0xf97316 : 0x1e293b });
      const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.16, 0.08, 12), capMat);
      cap.position.set(0, 1.6, 0);
      personGroup.add(cap);

      // Arms
      const armGeo = new THREE.CylinderGeometry(0.06, 0.05, 0.6, 8);
      const armL = new THREE.Mesh(armGeo, shirtMat);
      armL.position.set(-0.25, 1.05, 0);
      armL.castShadow = true;
      const armR = new THREE.Mesh(armGeo, shirtMat);
      armR.position.set(0.25, 1.05, 0.12);
      armR.rotation.x = -Math.PI / 4; // holding fuel nozzle
      armR.castShadow = true;
      personGroup.add(armL);
      personGroup.add(armR);

      return personGroup;
    };

    // Attendant 1: Operating fuel nozzle at SUV
    const attendant1 = create3DPerson(0xf97316, 0x1e3a8a, true); // Orange polo & navy pants
    attendant1.position.set(-3.2, 0, 4.6);
    attendant1.rotation.y = -Math.PI / 2;
    scene.add(attendant1);

    // Attendant 2: Monitoring digital pump at Island 2
    const attendant2 = create3DPerson(0xf97316, 0x1e3a8a, true);
    attendant2.position.set(1.9, 0, 4.2);
    attendant2.rotation.y = Math.PI / 3;
    scene.add(attendant2);

    // Customer: Standing near the sedan car
    const customer1 = create3DPerson(0xffffff, 0x334155, false); // White casual shirt, jeans
    customer1.position.set(-0.2, 0, 5.5);
    customer1.rotation.y = Math.PI;
    scene.add(customer1);

    // Garden patrons relaxing
    const patron1 = create3DPerson(0x10b981, 0x475569, false);
    patron1.position.set(5.5, 0.2, 6.2);
    scene.add(patron1);

    // 3. MAIN COMMERCIAL BUILDING (Housing Kitchen, VIP Lounge, & Leases)
    const mainBldgGeo = new THREE.BoxGeometry(16, 5, 8);
    const mainBldgMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.4,
      metalness: 0.3
    });
    const mainBldg = new THREE.Mesh(mainBldgGeo, mainBldgMat);
    mainBldg.position.set(-3, 2.5, -4);
    mainBldg.castShadow = true;
    mainBldg.receiveShadow = true;
    scene.add(mainBldg);

    // Glass Curtain Wall (Reflective front)
    const glassGeo = new THREE.PlaneGeometry(15.6, 4.4);
    const glassMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      roughness: 0.1,
      metalness: 0.9,
      transparent: true,
      opacity: 0.65
    });
    const frontGlass = new THREE.Mesh(glassGeo, glassMat);
    frontGlass.position.set(-3, 2.5, 0.02);
    scene.add(frontGlass);

    // MASTERS KITCHEN Wing (Warm Culinary Glow)
    const kitchenGlow = new THREE.PointLight(0xf97316, 1.6, 9);
    kitchenGlow.position.set(-8, 2.2, 0.5);
    scene.add(kitchenGlow);

    // MASTERS LOUNGE (Upper VIP Glass Pavilion)
    const loungeCubeGeo = new THREE.BoxGeometry(7, 3, 5);
    const loungeCubeMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.2,
      metalness: 0.8
    });
    const loungeCube = new THREE.Mesh(loungeCubeGeo, loungeCubeMat);
    loungeCube.position.set(-4, 5.5, -3);
    loungeCube.castShadow = true;
    scene.add(loungeCube);

    // VIP Lounge Ambient Backlit Window
    const vipGlassMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
    const vipWindow = new THREE.Mesh(new THREE.PlaneGeometry(6.6, 2.2), vipGlassMat);
    vipWindow.position.set(-4, 5.5, -0.48);
    scene.add(vipWindow);

    // 4. MASTERS CAR WASH BAY
    const washBuildingGeo = new THREE.BoxGeometry(6, 3.8, 9);
    const washMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      metalness: 0.4,
      roughness: 0.3
    });
    const washBldg = new THREE.Mesh(washBuildingGeo, washMat);
    washBldg.position.set(9, 1.9, -1);
    washBldg.castShadow = true;
    scene.add(washBldg);

    // Hexagon LED ceiling lights inside carwash
    const hexLight = new THREE.PointLight(0x38bdf8, 2.0, 10);
    hexLight.position.set(9, 2.8, -1);
    scene.add(hexLight);

    // Open entrance archway
    const archMat = new THREE.MeshBasicMaterial({ color: 0x0284c7 });
    const archFrame = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.3, 0.3), archMat);
    archFrame.position.set(9, 3.6, 3.5);
    scene.add(archFrame);

    // 5. MASTERS BAR & GARDEN
    // Garden Grass Plateau
    const gardenGeo = new THREE.CylinderGeometry(6, 6.2, 0.2, 32);
    const gardenMat = new THREE.MeshStandardMaterial({
      color: 0x14532d,
      roughness: 0.9
    });
    const gardenLawn = new THREE.Mesh(gardenGeo, gardenMat);
    gardenLawn.position.set(6, 0.1, 7);
    gardenLawn.receiveShadow = true;
    scene.add(gardenLawn);

    // Wooden Pergola / Cabanas
    const pergolaBeamMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.7 });
    const p1 = new THREE.Mesh(new THREE.BoxGeometry(3.5, 0.2, 3.5), pergolaBeamMat);
    p1.position.set(5.5, 2.4, 6.5);
    scene.add(p1);

    // Pergola corner posts
    [
      [4, 1.2, 5],
      [7, 1.2, 5],
      [4, 1.2, 8],
      [7, 1.2, 8]
    ].forEach(([x, y, z]) => {
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 2.4, 8), pergolaBeamMat);
      post.position.set(x, y, z);
      scene.add(post);
    });

    // 3D Palm Trees (Procedural trunk + coconut fronds)
    const createPalm = (px: number, pz: number, scale = 1) => {
      const trunkGeo = new THREE.CylinderGeometry(0.15 * scale, 0.25 * scale, 3.5 * scale, 8);
      const trunkMat = new THREE.MeshStandardMaterial({ color: 0x5c3d2e, roughness: 0.9 });
      const trunk = new THREE.Mesh(trunkGeo, trunkMat);
      trunk.position.set(px, (3.5 * scale) / 2, pz);
      trunk.castShadow = true;
      scene.add(trunk);

      // Fronds
      const crownMat = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.5 });
      for (let f = 0; f < 6; f++) {
        const frondGeo = new THREE.ConeGeometry(0.9 * scale, 1.6 * scale, 5);
        const frond = new THREE.Mesh(frondGeo, crownMat);
        frond.position.set(px, 3.4 * scale, pz);
        frond.rotation.z = Math.PI / 3;
        frond.rotation.y = (f * Math.PI) / 3;
        scene.add(frond);
      }
    };

    createPalm(7.5, 9, 1.1);
    createPalm(3.5, 8.5, 0.9);
    createPalm(-9, 8, 1.0);
    createPalm(-11, 4, 0.85);

    // 6. LEASED PROMENADE KIOSKS (Zena Foodies & Presh Arabian Tea)
    const kioskGeo = new THREE.BoxGeometry(2.5, 1.8, 2);
    const zenaKioskMat = new THREE.MeshStandardMaterial({ color: 0x854d0e, roughness: 0.4 });
    const zenaKiosk = new THREE.Mesh(kioskGeo, zenaKioskMat);
    zenaKiosk.position.set(-1, 0.9, -6.5);
    scene.add(zenaKiosk);

    const preshKioskMat = new THREE.MeshStandardMaterial({ color: 0x064e3b, roughness: 0.4 });
    const preshKiosk = new THREE.Mesh(kioskGeo, preshKioskMat);
    preshKiosk.position.set(2, 0.9, -6.5);
    scene.add(preshKiosk);

    // 7. Atmospheric particles / ambient lighting particles
    const particleCount = 120;
    const pGeo = new THREE.BufferGeometry();
    const pCoords = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      pCoords[i] = (Math.random() - 0.5) * 35;
      pCoords[i + 1] = Math.random() * 8 + 0.2;
      pCoords[i + 2] = (Math.random() - 0.5) * 35;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pCoords, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0xf97316,
      size: 0.12,
      transparent: true,
      opacity: 0.7
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);
    particlesRef.current = particles;

    // Apply initial environment
    updateEnvironmentLighting(timeOfDay);

    // ----------------------------------------------------
    // MOUSE & TOUCH ORBIT INTERACTION
    // ----------------------------------------------------
    const onMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      prevMousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const dx = e.clientX - prevMousePosRef.current.x;
      const dy = e.clientY - prevMousePosRef.current.y;
      prevMousePosRef.current = { x: e.clientX, y: e.clientY };

      sphericalRef.current.theta -= dx * 0.006;
      sphericalRef.current.phi = Math.max(0.2, Math.min(Math.PI / 2.1, sphericalRef.current.phi - dy * 0.006));

      // Calculate new camera position relative to desired target
      const radius = sphericalRef.current.radius;
      const sinPhi = Math.sin(sphericalRef.current.phi);
      const cosPhi = Math.cos(sphericalRef.current.phi);
      const sinTheta = Math.sin(sphericalRef.current.theta);
      const cosTheta = Math.cos(sphericalRef.current.theta);

      desiredPosRef.current.set(
        desiredTargetRef.current.x + radius * sinPhi * sinTheta,
        desiredTargetRef.current.y + radius * cosPhi,
        desiredTargetRef.current.z + radius * sinPhi * cosTheta
      );
      setIsCinematicTour(false);
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      sphericalRef.current.radius = Math.max(10, Math.min(50, sphericalRef.current.radius + e.deltaY * 0.03));
      const radius = sphericalRef.current.radius;
      const sinPhi = Math.sin(sphericalRef.current.phi);
      const cosPhi = Math.cos(sphericalRef.current.phi);
      const sinTheta = Math.sin(sphericalRef.current.theta);
      const cosTheta = Math.cos(sphericalRef.current.theta);

      desiredPosRef.current.set(
        desiredTargetRef.current.x + radius * sinPhi * sinTheta,
        desiredTargetRef.current.y + radius * cosPhi,
        desiredTargetRef.current.z + radius * sinPhi * cosTheta
      );
    };

    const onResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', onResize);
    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('wheel', onWheel, { passive: false });

    // ----------------------------------------------------
    // ANIMATION & RENDER LOOP
    // ----------------------------------------------------
    let reqId: number;
    let clock = new THREE.Clock();

    const tourSteps = ['oil-gas', 'kitchen', 'lounge', 'carwash', 'garden', 'leases'];

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Cinematic tour progression
      if (isCinematicTour) {
        tourTimerRef.current += delta;
        if (tourTimerRef.current > 6) {
          tourTimerRef.current = 0;
          tourStepRef.current = (tourStepRef.current + 1) % tourSteps.length;
          const currentStep = tourSteps[tourStepRef.current];
          const sector = SECTOR_CAMERAS[currentStep];
          desiredPosRef.current.copy(sector.pos);
          desiredTargetRef.current.copy(sector.target);
          setCameraModeLabel(`Automated Drone Tour: ${currentStep.toUpperCase()}`);
        }
      }

      // Smooth camera interpolation (lerp)
      if (cameraRef.current) {
        cameraRef.current.position.lerp(desiredPosRef.current, 0.04);
        currentTargetRef.current.lerp(desiredTargetRef.current, 0.05);
        cameraRef.current.lookAt(currentTargetRef.current);
      }

      // Slowly rotate particle dust
      if (particlesRef.current) {
        particlesRef.current.rotation.y = elapsed * 0.02;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('resize', onResize);
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('wheel', onWheel);
      renderer.dispose();
      groundGeo.dispose();
      groundMat.dispose();
      canopyRoofGeo.dispose();
      canopyMat.dispose();
      mainBldgGeo.dispose();
      mainBldgMat.dispose();
    };
  }, [updateEnvironmentLighting]);

  // Quick reset to overview
  const handleResetOverview = () => {
    desiredPosRef.current.copy(SECTOR_CAMERAS['overview'].pos);
    desiredTargetRef.current.copy(SECTOR_CAMERAS['overview'].target);
    setIsCinematicTour(false);
    setCameraModeLabel('Master Hub Overview');
  };

  const handleZoom = (direction: 'in' | 'out') => {
    if (!cameraRef.current) return;
    const factor = direction === 'in' ? 0.8 : 1.25;
    desiredPosRef.current.multiplyScalar(factor);
  };

  return (
    <div className="relative w-full h-[540px] md:h-[660px] bg-[#04060a] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
      {/* 3D WebGL Canvas */}
      <canvas ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing block" />

      {/* Floating Spatial Department Markers Overlay */}
      <div className="absolute inset-0 pointer-events-none p-5 sm:p-7 flex flex-col justify-between">
        {/* Top Control Bar: Time of day & Tour mode */}
        <div className="flex flex-wrap items-center justify-between gap-3 pointer-events-auto">
          <div className="flex items-center gap-2.5 px-3.5 py-2 bg-[#090d16]/90 backdrop-blur-xl rounded-xl border border-white/10 text-xs font-mono">
            <span className="text-slate-400">DIGITAL TWIN</span>
            <span className="text-slate-600">·</span>
            <span className="text-orange-500 font-bold uppercase tracking-wider">{cameraModeLabel}</span>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Time of Day Switcher */}
            <div className="flex items-center gap-1 p-1 bg-[#090d16]/90 backdrop-blur-xl rounded-xl border border-white/10">
              <button
                type="button"
                onClick={() => setTimeOfDay('day')}
                className={`p-2 rounded-lg text-xs transition-all cursor-pointer ${
                  timeOfDay === 'day' ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-bold shadow-md shadow-orange-500/20' : 'text-slate-400 hover:text-white'
                }`}
                title="Bright Daylight"
              >
                <Sun className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setTimeOfDay('sunset')}
                className={`p-2 rounded-lg text-xs transition-all cursor-pointer ${
                  timeOfDay === 'sunset' ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-bold shadow-md shadow-orange-500/20' : 'text-slate-400 hover:text-white'
                }`}
                title="Sunset / Golden Hour"
              >
                <Sunset className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setTimeOfDay('night')}
                className={`p-2 rounded-lg text-xs transition-all cursor-pointer ${
                  timeOfDay === 'night' ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-bold shadow-md shadow-orange-500/20' : 'text-slate-400 hover:text-white'
                }`}
                title="Midnight Illumination"
              >
                <Moon className="w-4 h-4" />
              </button>
            </div>

            {/* Drone Tour */}
            <button
              type="button"
              onClick={() => setIsCinematicTour(prev => !prev)}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-all border cursor-pointer ${
                isCinematicTour
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 border-orange-500 shadow-lg shadow-orange-500/25'
                  : 'bg-[#090d16]/90 backdrop-blur-xl text-slate-300 border-white/10 hover:text-white hover:border-orange-500/40'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>{isCinematicTour ? 'Halt Tour' : 'Drone Tour'}</span>
            </button>
          </div>
        </div>

        {/* Spatial Quick Selector Hotspots */}
        <div className="flex flex-col gap-2.5 max-w-md pointer-events-auto">
          <div className="text-[11px] font-mono uppercase tracking-widest text-slate-400 font-bold">
            FLY CAMERA TO SECTOR:
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'oil-gas', label: 'I · Forecourt', color: 'hover:border-orange-500 hover:text-orange-500' },
              { id: 'kitchen', label: 'II · Kitchen', color: 'hover:border-orange-400 hover:text-orange-400' },
              { id: 'lounge', label: 'III · VIP Lounge', color: 'hover:border-emerald-400 hover:text-emerald-400' },
              { id: 'carwash', label: 'IV · Car Wash', color: 'hover:border-cyan-400 hover:text-cyan-400' },
              { id: 'garden', label: 'V · Bar & Garden', color: 'hover:border-rose-400 hover:text-rose-400' }
            ].map(sec => (
              <button
                key={sec.id}
                type="button"
                onClick={() => onSelectDepartment(sec.id as DepartmentId)}
                onMouseEnter={() => setHoveredDept(sec.id as DepartmentId)}
                onMouseLeave={() => setHoveredDept(null)}
                className={`px-3 py-1.5 text-xs font-mono rounded-lg border transition-all whitespace-nowrap cursor-pointer ${
                  activeDepartment === sec.id
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 border-orange-500 font-bold shadow-md shadow-orange-500/20'
                    : 'bg-[#090d16]/90 backdrop-blur-md text-slate-300 border-white/10 ' + sec.color
                }`}
              >
                {sec.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Interactive HUD */}
        <div className="flex items-center justify-between pointer-events-auto">
          <div className="text-[10px] font-mono text-slate-400 bg-[#090d16]/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10 hidden sm:block">
            <span>ORBIT: DRAG</span>
            <span className="mx-2 text-slate-600">·</span>
            <span>ZOOM: SCROLL</span>
            <span className="mx-2 text-slate-600">·</span>
            <span className="text-amber-400">INTERACTIVE 3D CAD</span>
          </div>

          <div className="flex items-center gap-1.5 bg-[#090d16]/90 backdrop-blur-md p-1.5 rounded-xl border border-white/10">
            <button
              type="button"
              onClick={() => handleZoom('in')}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => handleZoom('out')}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleResetOverview}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              title="Reset View to Overview"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
