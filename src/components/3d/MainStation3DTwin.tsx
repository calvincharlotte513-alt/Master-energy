import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { DepartmentId, PageId } from '../../types/hub';
import {
  Compass,
  Sun,
  Sunset,
  Moon,
  RotateCcw,
  Play,
  Pause,
  ChevronDown,
  Sparkles,
  Maximize2
} from 'lucide-react';

interface MainStation3DTwinProps {
  activeDept: DepartmentId;
  onSelectDept: (deptId: DepartmentId) => void;
  onNavigatePage: (page: PageId) => void;
  onOpenDeptDetail: (deptId: DepartmentId) => void;
  onScrollToContent?: () => void;
}

interface HoverTooltipData {
  title: string;
  desc: string;
  tag: string;
  x: number;
  y: number;
}

// Procedural Canvas Texture for Station Overhead Canopy Fascia
function createCanopySignTexture(title: string, subtitle: string) {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.Texture();

  // Vibrant orange background with gradient matching logo flame
  const grad = ctx.createLinearGradient(0, 0, 1024, 0);
  grad.addColorStop(0, '#ea580c');
  grad.addColorStop(0.2, '#ff6a00');
  grad.addColorStop(0.8, '#ff6a00');
  grad.addColorStop(1, '#ea580c');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 128);

  // Black luxury borders
  ctx.fillStyle = '#090d16';
  ctx.fillRect(0, 0, 1024, 12);
  ctx.fillRect(0, 116, 1024, 12);

  // White accent pinstripes
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 12, 1024, 2);
  ctx.fillRect(0, 114, 1024, 2);

  // Left & right "ME" crest badges
  [45, 930].forEach((x) => {
    ctx.fillStyle = '#090d16';
    ctx.beginPath();
    ctx.roundRect(x, 22, 50, 84, 8);
    ctx.fill();
    ctx.fillStyle = '#ff6a00';
    ctx.font = '900 24px "Poppins", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('ME', x + 25, 64);
  });

  // Main Title: "MASTER ENERGY"
  ctx.fillStyle = '#090d16';
  ctx.font = '900 50px "Poppins", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(title, 512, 54);

  // Subtitle
  ctx.fillStyle = '#1e293b';
  ctx.font = 'bold 15px "Inter", sans-serif';
  ctx.letterSpacing = '3px';
  ctx.fillText(subtitle, 512, 92);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// Procedural Canvas Texture for Highway Roadside Price Totem Billboard
function createPriceTotemTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.Texture();

  // Dark obsidian backplate
  ctx.fillStyle = '#060910';
  ctx.fillRect(0, 0, 512, 1024);

  // Outer orange frame
  ctx.strokeStyle = '#f97316';
  ctx.lineWidth = 10;
  ctx.strokeRect(10, 10, 492, 1004);

  // Top Master Energy Brand Banner
  const headerGrad = ctx.createLinearGradient(0, 20, 0, 180);
  headerGrad.addColorStop(0, '#ff7700');
  headerGrad.addColorStop(1, '#ea580c');
  ctx.fillStyle = headerGrad;
  ctx.fillRect(20, 20, 472, 160);

  ctx.fillStyle = '#090d16';
  ctx.font = '900 36px "Poppins", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('MASTER ENERGY', 256, 75);

  ctx.fillStyle = '#1e293b';
  ctx.font = 'bold 18px "Inter", sans-serif';
  ctx.fillText('NAZE MEGA FORECOURT', 256, 118);

  ctx.fillStyle = '#000000';
  ctx.font = 'bold 13px "JetBrains Mono", monospace';
  ctx.fillText('★ 24/7 DPR CERTIFIED ★', 256, 150);

  // 4 Calibrated Fuel Price Rows
  const fuelList = [
    { name: 'PMS', desc: 'PETROL', price: '₦710', color: '#ff6a00', bar: '#ea580c' },
    { name: 'AGO', desc: 'DIESEL', price: '₦1050', color: '#34d399', bar: '#059669' },
    { name: 'DPK', desc: 'KEROSENE', price: '₦1150', color: '#38bdf8', bar: '#0284c7' },
    { name: 'LPG', desc: 'GAS / KG', price: '₦1400', color: '#fb923c', bar: '#ea580c' }
  ];

  const startY = 205;
  const rowHeight = 175;

  fuelList.forEach((fuel, i) => {
    const y = startY + i * rowHeight;

    // Fuel row card background
    ctx.fillStyle = '#0d1322';
    ctx.beginPath();
    ctx.roundRect(26, y, 460, 155, 12);
    ctx.fill();

    // Color indicator left bar
    ctx.fillStyle = fuel.bar;
    ctx.fillRect(26, y, 14, 155);

    // Border
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 2;
    ctx.strokeRect(26, y, 460, 155);

    // Fuel title
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 42px "Poppins", sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(fuel.name, 56, y + 50);

    // Fuel sub-label
    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 16px "Inter", sans-serif';
    ctx.fillText(fuel.desc, 56, y + 102);

    // Digital LED Price Screen Bezel
    ctx.fillStyle = '#010307';
    ctx.fillRect(215, y + 26, 255, 103);
    ctx.strokeStyle = fuel.bar;
    ctx.lineWidth = 3;
    ctx.strokeRect(215, y + 26, 255, 103);

    // Digital LED Number
    ctx.shadowColor = fuel.color;
    ctx.shadowBlur = 10;
    ctx.fillStyle = fuel.color;
    ctx.font = '900 46px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText(fuel.price, 342, y + 78);
    ctx.shadowBlur = 0;
  });

  // Bottom Guarantee
  ctx.fillStyle = '#ff6a00';
  ctx.font = 'bold 16px "Inter", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('10 LITERS IS 10 LITERS · ACCURATE METERS', 256, 940);
  ctx.fillStyle = '#64748b';
  ctx.font = '12px "Inter", sans-serif';
  ctx.fillText('KM 3 ABA-OWERRI ROAD, NAZE, IMO STATE', 256, 975);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export const MainStation3DTwin: React.FC<MainStation3DTwinProps> = ({
  activeDept,
  onSelectDept,
  onNavigatePage,
  onOpenDeptDetail,
  onScrollToContent
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [timeOfDay, setTimeOfDay] = useState<'sunset' | 'day' | 'night'>('day');
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [tooltipData, setTooltipData] = useState<HoverTooltipData | null>(null);
  const [activeSector, setActiveSector] = useState<string>('forecourt');

  // Three.js internal references
  const controlsRef = useRef<OrbitControls | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const interactiveObjectsRef = useRef<THREE.Mesh[]>([]);
  const hoveredMeshRef = useRef<THREE.Mesh | null>(null);

  // Particles references
  const dustParticlesRef = useRef<THREE.Points | null>(null);
  const dustVelocitiesRef = useRef<{ vx: number; vy: number; vz: number }[]>([]);

  // Consolidated High-Performance Lighting references (eliminates 11+ duplicate light calculations)
  const lightsRef = useRef<{
    ambient: THREE.AmbientLight;
    dir: THREE.DirectionalLight;
    hemi: THREE.HemisphereLight;
    forecourtLight: THREE.PointLight;
    totemLight: THREE.PointLight;
    buildingLight: THREE.PointLight;
  } | null>(null);

  // Camera animation interpolation
  const targetCamPosRef = useRef<THREE.Vector3 | null>(null);
  const targetLookAtRef = useRef<THREE.Vector3 | null>(null);

  // Update Environment Lighting based on selected time of day
  const updateEnvironmentLighting = useCallback((time: 'sunset' | 'day' | 'night') => {
    if (!sceneRef.current || !lightsRef.current) return;
    const {
      ambient,
      dir,
      hemi,
      forecourtLight,
      totemLight,
      buildingLight
    } = lightsRef.current;

    if (time === 'sunset') {
      // Warm golden dusk corporate aesthetic
      sceneRef.current.background = new THREE.Color(0xffedd5);
      sceneRef.current.fog = new THREE.FogExp2(0xfed7aa, 0.012);

      ambient.color.setHex(0xffedd5);
      ambient.intensity = 1.0;

      hemi.color.setHex(0xf59e0b);
      hemi.groundColor.setHex(0x334155);
      hemi.intensity = 0.8;

      dir.color.setHex(0xf59e0b);
      dir.intensity = 2.6;
      dir.position.set(24, 16, 20);

      forecourtLight.intensity = 2.8;
      forecourtLight.color.setHex(0xfffaed);

      totemLight.intensity = 2.5;
      totemLight.color.setHex(0xf59e0b);

      buildingLight.intensity = 2.2;
      buildingLight.color.setHex(0xf97316);
    } else if (time === 'day') {
      // Crisp daylight in clean White & Yellow luxury aesthetic (Primary Theme)
      sceneRef.current.background = new THREE.Color(0xf1f5f9);
      sceneRef.current.fog = new THREE.FogExp2(0xf1f5f9, 0.011);

      ambient.color.setHex(0xffffff);
      ambient.intensity = 1.25;

      hemi.color.setHex(0xffffff);
      hemi.groundColor.setHex(0xe2e8f0);
      hemi.intensity = 0.95;

      dir.color.setHex(0xfffbeb);
      dir.intensity = 2.9;
      dir.position.set(20, 32, 16);

      forecourtLight.intensity = 1.8;
      forecourtLight.color.setHex(0xffffff);

      totemLight.intensity = 2.4;
      totemLight.color.setHex(0xf59e0b);

      buildingLight.intensity = 1.8;
      buildingLight.color.setHex(0xf59e0b);
    } else {
      // Midnight illumination with vibrant illuminated branding
      sceneRef.current.background = new THREE.Color(0x060913);
      sceneRef.current.fog = new THREE.FogExp2(0x060913, 0.016);

      ambient.color.setHex(0x1e293b);
      ambient.intensity = 0.55;

      hemi.color.setHex(0x38bdf8);
      hemi.groundColor.setHex(0x0f172a);
      hemi.intensity = 0.45;

      dir.color.setHex(0x38bdf8);
      dir.intensity = 0.8;
      dir.position.set(12, 22, 12);

      forecourtLight.intensity = 4.2;
      forecourtLight.color.setHex(0xffffff);

      totemLight.intensity = 3.8;
      totemLight.color.setHex(0xf59e0b);

      buildingLight.intensity = 3.4;
      buildingLight.color.setHex(0x38bdf8);
    }
  }, []);

  // Smoothly glide camera to sector
  const focusCamera = (sectorId: string) => {
    setActiveSector(sectorId);

    const targetPos = new THREE.Vector3();
    const targetLook = new THREE.Vector3();

    if (sectorId === 'overview') {
      targetLook.set(0, 1.8, 0);
      targetPos.set(24, 18, 28);
    } else if (sectorId === 'forecourt' || sectorId === 'oil-gas') {
      targetLook.set(0, 2.2, 5);
      targetPos.set(5, 5.2, 15);
      onSelectDept('oil-gas');
    } else if (sectorId === 'totem') {
      targetLook.set(-11, 4.2, 11);
      targetPos.set(-7, 5.2, 18);
      onSelectDept('oil-gas');
    } else if (sectorId === 'kitchen') {
      targetLook.set(-6, 2.2, -2);
      targetPos.set(-10, 4.2, 7);
      onSelectDept('kitchen');
    } else if (sectorId === 'lounge') {
      targetLook.set(-4, 5.8, -4);
      targetPos.set(-4, 7.5, 6);
      onSelectDept('lounge');
    } else if (sectorId === 'carwash') {
      targetLook.set(9.5, 2.0, -1);
      targetPos.set(13.5, 4.2, 5);
      onSelectDept('carwash');
    } else if (sectorId === 'garden') {
      targetLook.set(6.5, 1.6, 7.5);
      targetPos.set(9.5, 4.2, 14);
      onSelectDept('garden');
    }

    targetCamPosRef.current = targetPos;
    targetLookAtRef.current = targetLook;
  };

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // 1. SCENE - Daylight White & Yellow Aesthetic
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0xf1f5f9);
    scene.fog = new THREE.FogExp2(0xf1f5f9, 0.011);

    // 2. CAMERA
    const width = container.clientWidth;
    const height = container.clientHeight;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 200);
    camera.position.set(20, 15, 24);
    cameraRef.current = camera;

    // 3. RENDERER WITH ACES FILMIC TONE MAPPING & PMREM
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    // Procedural Studio Environment Reflection for PBR Metals & Glass
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 4. ORBITCONTROLS (Allows natural mouse wheel and gesture page scrolling)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2.06; // Prevent underground clipping
    controls.minDistance = 6;
    controls.maxDistance = 65;
    controls.target.set(0, 1.8, 0);
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 0.8;
    controls.enableZoom = false; // Critical: allows mouse wheel & trackpad to scroll down to other content
    controls.enablePan = false;
    controlsRef.current = controls;

    // 5. LIGHTING SETUP (Consolidated for fast 60fps forward rendering in Daylight)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.25);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xe2e8f0, 0.95);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xfffbeb, 2.9);
    dirLight.position.set(20, 32, 16);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 512;
    dirLight.shadow.mapSize.height = 512;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 70;
    dirLight.shadow.camera.left = -22;
    dirLight.shadow.camera.right = 22;
    dirLight.shadow.camera.top = 22;
    dirLight.shadow.camera.bottom = -22;
    dirLight.shadow.bias = -0.001;
    scene.add(dirLight);

    // Recessed Canopy Underside Glowing Rings (Emissive bright fixtures)
    [
      [-3.8, 4.4, 3.2],
      [-3.8, 4.4, 6.8],
      [3.8, 4.4, 3.2],
      [3.8, 4.4, 6.8],
      [0, 4.4, 3.2],
      [0, 4.4, 6.8]
    ].forEach(([x, y, z]) => {
      const ringGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.05, 12);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0xfffaed });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.set(x, 4.12, z);
      scene.add(ring);
    });

    // Central Forecourt Warm Point Light (Bathes all pumps and vehicles evenly)
    const forecourtLight = new THREE.PointLight(0xfffaed, 3.6, 22, 1.4);
    forecourtLight.position.set(0, 4.2, 5.0);
    scene.add(forecourtLight);

    // Roadside Totem Point Light (Glows over highway entrance)
    const totemLight = new THREE.PointLight(0xf59e0b, 2.8, 14, 1.5);
    totemLight.position.set(-11, 4.5, 11);
    scene.add(totemLight);

    // Facility Building Warm Accent Light (Illuminates Kitchen, Lounge & Car Wash)
    const buildingLight = new THREE.PointLight(0xf97316, 2.6, 18, 1.4);
    buildingLight.position.set(-4, 3.5, 0.5);
    scene.add(buildingLight);

    lightsRef.current = {
      ambient: ambientLight,
      dir: dirLight,
      hemi: hemiLight,
      forecourtLight,
      totemLight,
      buildingLight
    };

    // 6. 3D ARCHITECTURAL GEOMETRY: REAL PHYSICAL NIGERIAN MEGA HUB
    const interactiveObjects: THREE.Mesh[] = [];

    // Tarmac Ground Plane with Realistic Clean Asphalt Finish
    const groundGeo = new THREE.PlaneGeometry(80, 80);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.76,
      metalness: 0.12
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Concrete Highway Entry Curb & Apron
    const curbGeo = new THREE.BoxGeometry(34, 0.22, 1.4);
    const curbMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      roughness: 0.65,
      metalness: 0.2
    });
    const curb = new THREE.Mesh(curbGeo, curbMat);
    curb.position.set(0, 0.11, 12);
    curb.receiveShadow = true;
    scene.add(curb);

    // Road Markings: Orange pump bay divider lanes & White pedestrian crossing
    const orangeLaneMat = new THREE.MeshBasicMaterial({ color: 0xf97316 });
    const whiteCrossingMat = new THREE.MeshBasicMaterial({ color: 0xf8fafc });

    [-6.2, -1.0, 1.0, 6.2].forEach(lx => {
      const line = new THREE.Mesh(new THREE.PlaneGeometry(0.14, 9.5), orangeLaneMat);
      line.rotation.x = -Math.PI / 2;
      line.position.set(lx, 0.02, 5.0);
      scene.add(line);
    });

    // Zebra safety pedestrian crossing from building to pumps
    for (let z = 0; z < 7; z++) {
      const stripe = new THREE.Mesh(new THREE.PlaneGeometry(2.0, 0.38), whiteCrossingMat);
      stripe.rotation.x = -Math.PI / 2;
      stripe.position.set(-2.5, 0.02, 0.0 + z * 0.62);
      scene.add(stripe);
    }

    // A. OVERHEAD FUELING CANOPY STRUCTURE (Double-Tier Modern Architectural Design in White & Orange)
    const canopyRoofGeo = new THREE.BoxGeometry(16.5, 0.85, 12.5);
    const canopyRoofMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.25,
      metalness: 0.5
    });
    const canopy = new THREE.Mesh(canopyRoofGeo, canopyRoofMat);
    canopy.position.set(0, 4.6, 5);
    canopy.castShadow = true;
    canopy.receiveShadow = true;
    canopy.userData = {
      name: 'Master Energy Forecourt Canopy',
      desc: 'Double-tier high-clearance canopy with 16 high-speed digital dispenser nozzles',
      tag: '16 NOZZLES · DPR CALIBRATED',
      dept: 'oil-gas'
    };
    scene.add(canopy);
    interactiveObjects.push(canopy);

    // Glowing Neon Brand Fascia Trim (Master Energy Deep Logo Orange)
    const fasciaGeo = new THREE.BoxGeometry(16.7, 0.45, 12.7);
    const fasciaMat = new THREE.MeshStandardMaterial({
      color: 0xf97316,
      emissive: 0xea580c,
      emissiveIntensity: 0.88,
      roughness: 0.2,
      metalness: 0.5
    });
    const canopyFascia = new THREE.Mesh(fasciaGeo, fasciaMat);
    canopyFascia.position.set(0, 4.6, 5);
    scene.add(canopyFascia);

    // PROMINENT "MASTER ENERGY" BRAND SIGNAGE ON CANOPY FASCIA (Front & Rear)
    const canopySignTex = createCanopySignTexture('MASTER ENERGY', 'NAZE MEGA HUB · IMO STATE');
    const canopySignGeo = new THREE.PlaneGeometry(16.2, 0.72);
    const canopySignMat = new THREE.MeshBasicMaterial({
      map: canopySignTex,
      toneMapped: false
    });

    // Front Face (Facing highway entrance & drivers)
    const canopySignFront = new THREE.Mesh(canopySignGeo, canopySignMat);
    canopySignFront.position.set(0, 4.65, 11.38);
    scene.add(canopySignFront);

    // Rear Face (Facing restaurant & lounge exit)
    const canopySignRear = new THREE.Mesh(canopySignGeo, canopySignMat);
    canopySignRear.position.set(0, 4.65, -1.38);
    canopySignRear.rotation.y = Math.PI;
    scene.add(canopySignRear);

    // ROOFTOP ENTRANCE ARCH SIGNBOARD (Prominently displays MASTER ENERGY above roof)
    const roofArchGeo = new THREE.BoxGeometry(11.0, 1.4, 0.3);
    const roofArchMat = new THREE.MeshStandardMaterial({
      color: 0xf97316,
      roughness: 0.2,
      metalness: 0.6
    });
    const roofArch = new THREE.Mesh(roofArchGeo, roofArchMat);
    roofArch.position.set(0, 5.75, 10.8);
    scene.add(roofArch);

    const roofSignTex = createCanopySignTexture('MASTER ENERGY', 'FLAGSHIP FUELING & LIFESTYLE COMPLEX');
    const roofSignFace = new THREE.Mesh(
      new THREE.PlaneGeometry(10.8, 1.25),
      new THREE.MeshBasicMaterial({ map: roofSignTex, toneMapped: false })
    );
    roofSignFace.position.set(0, 5.75, 10.96);
    scene.add(roofSignFace);

    // Master Energy Illuminated Under-Canopy Logo Crest
    const logoBlock = new THREE.Mesh(
      new THREE.BoxGeometry(3.5, 0.3, 0.1),
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: 0xffedd5,
        emissiveIntensity: 0.95
      })
    );
    logoBlock.position.set(0, 4.6, 11.36);
    scene.add(logoBlock);

    // 4 Heavy-Duty Brushed Steel & Concrete Canopy Support Columns
    const pillarGeo = new THREE.CylinderGeometry(0.36, 0.36, 4.6, 18);
    const pillarMat = new THREE.MeshStandardMaterial({
      color: 0xcbd5e1,
      metalness: 0.85,
      roughness: 0.22
    });
    const orangeBollardMat = new THREE.MeshStandardMaterial({
      color: 0xf97316,
      roughness: 0.4
    });

    [
      [-4.8, 2.3, 2.5],
      [4.8, 2.3, 2.5],
      [-4.8, 2.3, 7.5],
      [4.8, 2.3, 7.5]
    ].forEach(([x, y, z]) => {
      const pillar = new THREE.Mesh(pillarGeo, pillarMat);
      pillar.position.set(x, y, z);
      pillar.castShadow = true;
      scene.add(pillar);

      // Orange collision safety collar at pillar base
      const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.65, 16), orangeBollardMat);
      collar.position.set(x, 0.32, z);
      scene.add(collar);
    });

    // B. PUMP ISLANDS & 4 DUAL-SIDED DIGITAL DISPENSERS WITH HOSES & NOZZLES
    const islandGeo = new THREE.BoxGeometry(2.0, 0.26, 8.2);
    const islandMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      roughness: 0.55,
      metalness: 0.3
    });

    const islandL = new THREE.Mesh(islandGeo, islandMat);
    islandL.position.set(-3.2, 0.13, 5);
    scene.add(islandL);

    const islandR = new THREE.Mesh(islandGeo, islandMat);
    islandR.position.set(3.2, 0.13, 5);
    scene.add(islandR);

    // Orange protection bollards at the ends of each pump island
    [
      [-3.2, 0.5, 1.2],
      [-3.2, 0.5, 8.8],
      [3.2, 0.5, 1.2],
      [3.2, 0.5, 8.8]
    ].forEach(([bx, by, bz]) => {
      const bMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.9, 12), orangeBollardMat);
      bMesh.position.set(bx, by, bz);
      scene.add(bMesh);
    });

    // 4 Digital Fuel Dispensers with Hose Bevels
    const dispensersData = [
      {
        pos: [-3.2, 1.15, 3.2],
        name: 'PMS High-Flow Dispenser (Nozzles 01-04)',
        desc: 'Certified DPR digital volume meters · Tamper-proof electronic calibration',
        tag: 'PMS: ₦710 / Liter',
        dept: 'oil-gas'
      },
      {
        pos: [-3.2, 1.15, 6.8],
        name: 'PMS Fast Commercial Pump (Nozzles 05-08)',
        desc: 'High-speed flow for commercial transit buses, SUVs and cars',
        tag: 'PMS: ₦710 / Liter',
        dept: 'oil-gas'
      },
      {
        pos: [3.2, 1.15, 3.2],
        name: 'AGO Commercial Heavy Diesel Pump (Nozzles 09-12)',
        desc: 'High-flow commercial diesel nozzles for trucks, heavy generators & fleet buses',
        tag: 'AGO: ₦1,050 / Liter',
        dept: 'oil-gas'
      },
      {
        pos: [3.2, 1.15, 6.8],
        name: 'DPK Household Kerosene & Cylinder LPG (Nozzles 13-16)',
        desc: 'Domestic household kerosene and precision weight LPG gas refilling',
        tag: 'DPK: ₦890 / Liter · LPG: ₦1,250 / Kg',
        dept: 'oil-gas'
      }
    ];

    const dispenserBodyGeo = new THREE.BoxGeometry(0.95, 2.05, 0.95);
    const hoseMat = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.9 });
    const nozzleMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9, roughness: 0.2 });

    dispensersData.forEach(item => {
      const pMat = new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        metalness: 0.75,
        roughness: 0.22,
        emissive: 0x0f172a,
        emissiveIntensity: 0.25
      });
      const dispenser = new THREE.Mesh(dispenserBodyGeo, pMat);
      dispenser.position.set(item.pos[0], item.pos[1], item.pos[2]);
      dispenser.castShadow = true;
      dispenser.userData = {
        name: item.name,
        desc: item.desc,
        tag: item.tag,
        dept: item.dept,
        defaultEmissive: 0x0f172a
      };
      scene.add(dispenser);
      interactiveObjects.push(dispenser);

      // Backlit Digital LCD Volume Display
      const lcdScreen = new THREE.Mesh(
        new THREE.PlaneGeometry(0.48, 0.32),
        new THREE.MeshBasicMaterial({ color: 0x10b981 })
      );
      const isLeft = item.pos[0] < 0;
      lcdScreen.position.set(item.pos[0] + (isLeft ? 0.49 : -0.49), item.pos[1] + 0.38, item.pos[2]);
      lcdScreen.rotation.y = isLeft ? Math.PI / 2 : -Math.PI / 2;
      scene.add(lcdScreen);

      // Hanging flexible black rubber fuel hoses
      const hoseCurve = new THREE.CubicBezierCurve3(
        new THREE.Vector3(item.pos[0] + (isLeft ? 0.4 : -0.4), item.pos[1] + 0.75, item.pos[2] - 0.25),
        new THREE.Vector3(item.pos[0] + (isLeft ? 0.75 : -0.75), item.pos[1] + 0.1, item.pos[2] - 0.3),
        new THREE.Vector3(item.pos[0] + (isLeft ? 0.75 : -0.75), item.pos[1] + 0.05, item.pos[2] + 0.1),
        new THREE.Vector3(item.pos[0] + (isLeft ? 0.48 : -0.48), item.pos[1] + 0.4, item.pos[2] + 0.2)
      );
      const hoseGeo = new THREE.TubeGeometry(hoseCurve, 14, 0.035, 8, false);
      const hoseMesh = new THREE.Mesh(hoseGeo, hoseMat);
      scene.add(hoseMesh);

      // Fuel nozzle handle docked in holster
      const nozzle = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.24, 0.12), nozzleMat);
      nozzle.position.set(item.pos[0] + (isLeft ? 0.49 : -0.49), item.pos[1] + 0.42, item.pos[2] + 0.22);
      scene.add(nozzle);
    });

    // C. ROADSIDE DIGITAL PRICING LED TOTEM BILLBOARD (Highway Entry)
    const totemPylonGeo = new THREE.BoxGeometry(1.9, 8.5, 0.75);
    const totemPylonMat = new THREE.MeshStandardMaterial({
      color: 0x070a12,
      metalness: 0.85,
      roughness: 0.18,
      emissive: 0x000000
    });
    const totemPylon = new THREE.Mesh(totemPylonGeo, totemPylonMat);
    totemPylon.position.set(-11, 4.25, 11);
    totemPylon.castShadow = true;
    totemPylon.userData = {
      name: 'Master Energy Roadside Price Totem Billboard',
      desc: 'Real-time DPR calibrated fuel rates: PMS ₦710 · AGO ₦1,050 · DPK ₦1,150 · LPG ₦1,400',
      tag: 'PMS ₦710 · AGO ₦1,050 · DPK ₦1,150 · LPG ₦1,400',
      dept: 'oil-gas',
      defaultEmissive: 0x000000
    };
    scene.add(totemPylon);
    interactiveObjects.push(totemPylon);

    // Master Energy illuminated top emblem crown
    const totemCrown = new THREE.Mesh(
      new THREE.BoxGeometry(2.1, 0.85, 0.85),
      new THREE.MeshStandardMaterial({
        color: 0xf97316,
        emissive: 0xea580c,
        emissiveIntensity: 0.95
      })
    );
    totemCrown.position.set(-11, 8.45, 11);
    scene.add(totemCrown);

    // Dynamic Digital LED Price Texture (Front & Back)
    const totemTex = createPriceTotemTexture();
    const totemBoardGeo = new THREE.PlaneGeometry(1.72, 6.4);
    const totemBoardMat = new THREE.MeshBasicMaterial({
      map: totemTex,
      toneMapped: false
    });

    // Front Face (Facing highway entrance)
    const totemFront = new THREE.Mesh(totemBoardGeo, totemBoardMat);
    totemFront.position.set(-11, 4.4, 11.39);
    scene.add(totemFront);

    // Back Face (Facing vehicles leaving the complex)
    const totemBack = new THREE.Mesh(totemBoardGeo, totemBoardMat);
    totemBack.position.set(-11, 4.4, 10.61);
    totemBack.rotation.y = Math.PI;
    scene.add(totemBack);

    // D. 2-STORY COMMERCIAL COMPLEX: MASTERS KITCHEN & MASTERS VIP LOUNGE
    const complexBody = new THREE.Mesh(
      new THREE.BoxGeometry(18, 5.6, 9.5),
      new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        roughness: 0.35,
        metalness: 0.45
      })
    );
    complexBody.position.set(-3.5, 2.8, -5);
    complexBody.castShadow = true;
    complexBody.receiveShadow = true;
    complexBody.userData = {
      name: 'Masters Commercial Complex (Kitchen & VIP Lounge)',
      desc: 'Ground floor authentic restaurant and upper floor executive cocktail terrace',
      tag: 'GROUND FLOOR RESTAURANT · ROOFTOP VIP LOUNGE',
      dept: 'kitchen'
    };
    scene.add(complexBody);
    interactiveObjects.push(complexBody);

    // Masters Kitchen Panoramic Floor-to-Ceiling Glass Frontage
    const kitchenGlass = new THREE.Mesh(
      new THREE.PlaneGeometry(17.4, 4.8),
      new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        metalness: 0.92,
        roughness: 0.08,
        transparent: true,
        opacity: 0.58
      })
    );
    kitchenGlass.position.set(-3.5, 2.7, -0.2);
    scene.add(kitchenGlass);

    // Masters Kitchen Illuminated Front Fascia Sign
    const kitchenSign = new THREE.Mesh(
      new THREE.BoxGeometry(5.2, 0.4, 0.15),
      new THREE.MeshStandardMaterial({
        color: 0xf97316,
        emissive: 0xea580c,
        emissiveIntensity: 0.9
      })
    );
    kitchenSign.position.set(-7, 4.9, -0.15);
    scene.add(kitchenSign);

    // Upstairs VIP Lounge Extended Glass Cube
    const loungeCube = new THREE.Mesh(
      new THREE.BoxGeometry(8.2, 3.2, 6.2),
      new THREE.MeshStandardMaterial({
        color: 0x070b14,
        roughness: 0.18,
        metalness: 0.85
      })
    );
    loungeCube.position.set(-4.5, 6.0, -4.0);
    loungeCube.castShadow = true;
    loungeCube.userData = {
      name: 'Masters VIP Lounge & Executive Terrace',
      desc: 'Glass-wrapped luxury cocktail lounge with private pods and panoramic highway view',
      tag: 'EXECUTIVE RETREAT · VIP BOTTLE SERVICE',
      dept: 'lounge'
    };
    scene.add(loungeCube);
    interactiveObjects.push(loungeCube);

    // Emerald Glowing VIP Window Wall
    const vipGlass = new THREE.Mesh(
      new THREE.PlaneGeometry(7.8, 2.6),
      new THREE.MeshStandardMaterial({
        color: 0x10b981,
        emissive: 0x059669,
        emissiveIntensity: 0.55,
        transparent: true,
        opacity: 0.65
      })
    );
    vipGlass.position.set(-4.5, 6.0, -0.88);
    scene.add(vipGlass);

    // Terrace Metal Safety Railing
    const railingGeo = new THREE.BoxGeometry(7.8, 0.85, 0.05);
    const railingMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9, roughness: 0.2 });
    const railing = new THREE.Mesh(railingGeo, railingMat);
    railing.position.set(-4.5, 5.0, -0.4);
    scene.add(railing);

    // E. MASTERS AUTOMATED CAR WASH BAY
    const washBldg = new THREE.Mesh(
      new THREE.BoxGeometry(6.6, 4.2, 9.5),
      new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        metalness: 0.65,
        roughness: 0.3
      })
    );
    washBldg.position.set(9.5, 2.1, -1);
    washBldg.castShadow = true;
    washBldg.userData = {
      name: 'Masters Automated Car Wash',
      desc: 'High-pressure foam wash, chassis underbody blast and interior valet detailing',
      tag: 'FAST FOAM WASH & VACUUM',
      dept: 'carwash'
    };
    scene.add(washBldg);
    interactiveObjects.push(washBldg);

    // Glowing Blue Neon Entrance Arch
    const washArch = new THREE.Mesh(
      new THREE.BoxGeometry(5.8, 0.35, 0.35),
      new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x0284c7,
        emissiveIntensity: 0.95
      })
    );
    washArch.position.set(9.5, 3.8, 3.8);
    scene.add(washArch);

    // F. MASTERS BAR & PALM GARDEN OASIS
    const gardenLawn = new THREE.Mesh(
      new THREE.CylinderGeometry(6.8, 7.0, 0.22, 32),
      new THREE.MeshStandardMaterial({
        color: 0x166534,
        roughness: 0.92
      })
    );
    gardenLawn.position.set(6.8, 0.11, 7.5);
    gardenLawn.receiveShadow = true;
    gardenLawn.userData = {
      name: 'Masters Bar & Palm Garden',
      desc: 'Open-air cabana seating, live charcoal suya & asun grill, cold drinks, big screens',
      tag: 'CHARCOAL SUYA · CHILLED DRINKS · MATCHDAYS',
      dept: 'garden'
    };
    scene.add(gardenLawn);
    interactiveObjects.push(gardenLawn);

    // Wooden Pergola / Cabana
    const pergola = new THREE.Mesh(
      new THREE.BoxGeometry(3.8, 0.25, 3.8),
      new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.75 })
    );
    pergola.position.set(6.5, 2.5, 7.2);
    scene.add(pergola);

    // Pergola wooden support posts
    [
      [4.8, 1.25, 5.5],
      [8.2, 1.25, 5.5],
      [4.8, 1.25, 8.9],
      [8.2, 1.25, 8.9]
    ].forEach(([px, py, pz]) => {
      const post = new THREE.Mesh(
        new THREE.CylinderGeometry(0.1, 0.1, 2.5, 8),
        new THREE.MeshStandardMaterial({ color: 0x5c2b0c, roughness: 0.8 })
      );
      post.position.set(px, py, pz);
      scene.add(post);
    });

    // Live Charcoal Suya Barbecue Grill with Glowing Red Embers
    const grillBody = new THREE.Mesh(
      new THREE.BoxGeometry(1.2, 0.8, 0.6),
      new THREE.MeshStandardMaterial({ color: 0x18181b, metalness: 0.8, roughness: 0.4 })
    );
    grillBody.position.set(6.8, 0.4, 8.5);
    scene.add(grillBody);

    const glowingCoals = new THREE.Mesh(
      new THREE.BoxGeometry(1.1, 0.05, 0.5),
      new THREE.MeshBasicMaterial({ color: 0xef4444 })
    );
    glowingCoals.position.set(6.8, 0.82, 8.5);
    scene.add(glowingCoals);

    // Palm Trees with illuminated crowns
    const createPalm = (px: number, pz: number, s = 1) => {
      const trunk = new THREE.Mesh(
        new THREE.CylinderGeometry(0.16 * s, 0.26 * s, 3.6 * s, 8),
        new THREE.MeshStandardMaterial({ color: 0x5c3d2e, roughness: 0.9 })
      );
      trunk.position.set(px, (3.6 * s) / 2, pz);
      trunk.castShadow = true;
      scene.add(trunk);

      const crownMat = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.55 });
      for (let f = 0; f < 6; f++) {
        const frond = new THREE.Mesh(new THREE.ConeGeometry(0.95 * s, 1.6 * s, 5), crownMat);
        frond.position.set(px, 3.5 * s, pz);
        frond.rotation.z = Math.PI / 3;
        frond.rotation.y = (f * Math.PI) / 3;
        scene.add(frond);
      }
    };
    createPalm(8.5, 9.8, 1.15);
    createPalm(4.2, 9.2, 0.95);
    createPalm(-9.8, 8.5, 1.05);

    // G. 3D COMPOSITE VEHICLES (Multi-part realistic procedural cars)
    const createCompositeVehicle = (colorHex: number, isSUV = false) => {
      const g = new THREE.Group();
      const length = isSUV ? 3.6 : 3.1;
      const height = isSUV ? 0.78 : 0.62;
      const width = isSUV ? 1.65 : 1.48;

      // 1. Lower Chassis
      const bodyMat = new THREE.MeshStandardMaterial({
        color: colorHex,
        metalness: 0.88,
        roughness: 0.18
      });
      const body = new THREE.Mesh(new THREE.BoxGeometry(width, height, length), bodyMat);
      body.position.y = height / 2 + 0.22;
      body.castShadow = true;
      g.add(body);

      // 2. Cabin Glass Greenhouse
      const cabinMat = new THREE.MeshStandardMaterial({
        color: 0x090e17,
        roughness: 0.08,
        metalness: 0.9,
        transparent: true,
        opacity: 0.85
      });
      const cabin = new THREE.Mesh(
        new THREE.BoxGeometry(width * 0.86, height * 0.82, length * 0.56),
        cabinMat
      );
      cabin.position.set(0, height + 0.38, -0.1);
      g.add(cabin);

      // 3. Headlights (Glowing Xenon LED)
      const headlightMat = new THREE.MeshBasicMaterial({ color: 0xfffaed });
      const hlL = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.12, 0.05), headlightMat);
      hlL.position.set(-width * 0.35, height * 0.7, length / 2 + 0.01);
      const hlR = hlL.clone();
      hlR.position.x = width * 0.35;
      g.add(hlL, hlR);

      // 4. Taillights (Red LED bar)
      const taillightMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
      const tl = new THREE.Mesh(new THREE.BoxGeometry(width * 0.85, 0.1, 0.05), taillightMat);
      tl.position.set(0, height * 0.7, -length / 2 - 0.01);
      g.add(tl);

      // 5. Wheels & Tires
      const tireMat = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.85 });
      const rimMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.95, roughness: 0.15 });
      const wheelGeo = new THREE.CylinderGeometry(0.34, 0.34, 0.22, 14);
      const rimGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.24, 14);

      [
        [-width / 2, 0.34, -length * 0.32],
        [width / 2, 0.34, -length * 0.32],
        [-width / 2, 0.34, length * 0.32],
        [width / 2, 0.34, length * 0.32]
      ].forEach(([x, y, z]) => {
        const tire = new THREE.Mesh(wheelGeo, tireMat);
        tire.rotation.z = Math.PI / 2;
        tire.position.set(x, y, z);
        tire.castShadow = true;

        const rim = new THREE.Mesh(rimGeo, rimMat);
        rim.rotation.z = Math.PI / 2;
        rim.position.set(x, y, z);

        g.add(tire, rim);
      });

      return g;
    };

    // Silver Metallic Lexus SUV at Bay 1
    const suv = createCompositeVehicle(0x94a3b8, true);
    suv.position.set(-5.0, 0, 5.0);
    scene.add(suv);

    // Deep Navy Executive Sedan at Bay 2
    const sedan = createCompositeVehicle(0x1e3a8a, false);
    sedan.position.set(1.2, 0, 4.8);
    scene.add(sedan);

    // White Hilux Pickup at Bay 3
    const hilux = createCompositeVehicle(0xf1f5f9, true);
    hilux.position.set(5.2, 0, 5.2);
    scene.add(hilux);

    // Clean sedan getting foam wash inside Car Wash
    const washCar = createCompositeVehicle(0x38bdf8, false);
    washCar.position.set(9.5, 0, -1.0);
    scene.add(washCar);

    // H. STATION ATTENDANTS IN HIGH-VISIBILITY MASTER ENERGY UNIFORMS
    const createAttendantFigure = (x: number, z: number, ry: number) => {
      const g = new THREE.Group();
      const hiVisOrange = new THREE.MeshStandardMaterial({
        color: 0xf97316,
        roughness: 0.6
      });
      const navyPants = new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        roughness: 0.7
      });
      const skinMat = new THREE.MeshStandardMaterial({
        color: 0x5a3825,
        roughness: 0.8
      });
      const capMat = new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        roughness: 0.5
      });

      // Legs
      const legGeo = new THREE.CylinderGeometry(0.08, 0.07, 0.8, 8);
      const lL = new THREE.Mesh(legGeo, navyPants);
      lL.position.set(-0.1, 0.4, 0);
      const lR = new THREE.Mesh(legGeo, navyPants);
      lR.position.set(0.1, 0.4, 0);
      g.add(lL, lR);

      // Torso with reflective hi-vis vest
      const torso = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.7, 0.24), hiVisOrange);
      torso.position.set(0, 1.15, 0);
      g.add(torso);

      // Reflective silver vest band
      const vestBand = new THREE.Mesh(
        new THREE.BoxGeometry(0.42, 0.12, 0.26),
        new THREE.MeshBasicMaterial({ color: 0xf8fafc })
      );
      vestBand.position.set(0, 1.15, 0);
      g.add(vestBand);

      // Head & Safety Cap
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.14, 10, 10), skinMat);
      head.position.set(0, 1.62, 0);
      g.add(head);

      const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.16, 0.08, 10), capMat);
      cap.position.set(0, 1.74, 0);
      g.add(cap);

      // Handheld POS payment terminal
      const posTerminal = new THREE.Mesh(
        new THREE.BoxGeometry(0.08, 0.15, 0.04),
        new THREE.MeshStandardMaterial({ color: 0x111827 })
      );
      posTerminal.position.set(0.24, 1.0, 0.12);
      g.add(posTerminal);

      g.position.set(x, 0, z);
      g.rotation.y = ry;
      scene.add(g);
      return g;
    };

    createAttendantFigure(-3.9, 5.0, -Math.PI / 2);
    createAttendantFigure(2.4, 4.6, Math.PI / 3);
    createAttendantFigure(4.3, 5.2, -Math.PI / 4);

    interactiveObjectsRef.current = interactiveObjects;

    // 7. ATMOSPHERIC PARTICLES (Optimized GPU-friendly single system of 110 motes)
    const dustCount = 110;
    const dustGeo = new THREE.BufferGeometry();
    const dustCoords = new Float32Array(dustCount * 3);
    const dustVels: { vx: number; vy: number; vz: number }[] = [];

    for (let i = 0; i < dustCount; i++) {
      const i3 = i * 3;
      dustCoords[i3] = (Math.random() - 0.5) * 44;
      dustCoords[i3 + 1] = Math.random() * 8.5 + 0.3;
      dustCoords[i3 + 2] = (Math.random() - 0.5) * 44;

      dustVels.push({
        vx: (Math.random() - 0.5) * 0.005,
        vy: Math.random() * 0.008 + 0.002,
        vz: (Math.random() - 0.5) * 0.005
      });
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustCoords, 3));
    const dustMat = new THREE.PointsMaterial({
      color: 0xf97316,
      size: 0.16,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });
    const dustSystem = new THREE.Points(dustGeo, dustMat);
    scene.add(dustSystem);
    dustParticlesRef.current = dustSystem;
    dustVelocitiesRef.current = dustVels;

    // Apply initial environment
    updateEnvironmentLighting(timeOfDay);

    // 8. RAYCASTER & INTERACTION (Throttled per frame for smooth 60fps)
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-1000, -1000);
    let mouseMoved = false;
    let clientX = 0;
    let clientY = 0;

    const onPointerMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      clientX = e.clientX - rect.left;
      clientY = e.clientY - rect.top;
      mouseMoved = true;
    };

    const onPointerClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactiveObjectsRef.current);
      if (intersects.length > 0) {
        const hit = intersects[0].object;
        if (hit.userData?.dept) {
          onSelectDept(hit.userData.dept as DepartmentId);
          onNavigatePage(hit.userData.dept as PageId);
        }
      }
    };

    canvas.addEventListener('mousemove', onPointerMove, { passive: true });
    canvas.addEventListener('click', onPointerClick);

    // Resize listener with mobile viewport clamping
    const onResize = () => {
      if (!container || !renderer || !camera) return;
      const w = Math.min(container.clientWidth, window.innerWidth);
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // 9. ANIMATION LOOP WITH INTERSECTION OBSERVER (Pauses when scrolled away)
    let animationFrameId: number;
    let isVisible = true;
    let lastRaycastTime = 0;

    const animate = () => {
      if (!isVisible) return;
      animationFrameId = requestAnimationFrame(animate);

      // Smooth camera interpolation
      if (targetCamPosRef.current && targetLookAtRef.current) {
        camera.position.lerp(targetCamPosRef.current, 0.05);
        controls.target.lerp(targetLookAtRef.current, 0.05);

        if (camera.position.distanceTo(targetCamPosRef.current) < 0.1) {
          targetCamPosRef.current = null;
          targetLookAtRef.current = null;
        }
      }

      controls.update();

      // Atmospheric golden dust subtle orbital drift and vertical float
      if (dustParticlesRef.current) {
        dustParticlesRef.current.rotation.y += 0.0006;
        const posAttr = dustParticlesRef.current.geometry.attributes.position;
        const posArr = posAttr.array as Float32Array;
        const vels = dustVelocitiesRef.current;

        for (let i = 0; i < dustCount; i++) {
          const yIdx = i * 3 + 1;
          posArr[yIdx] += vels[i].vy;
          if (posArr[yIdx] > 8.5) {
            posArr[yIdx] = 0.3;
          }
        }
        posAttr.needsUpdate = true;
      }

      // Throttled raycast (maximum once every 45ms, only when pointer moved)
      const now = performance.now();
      if (mouseMoved && now - lastRaycastTime > 45) {
        lastRaycastTime = now;
        mouseMoved = false;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(interactiveObjectsRef.current);

        if (intersects.length > 0) {
          const hit = intersects[0].object as THREE.Mesh;
          if (hoveredMeshRef.current !== hit) {
            if (hoveredMeshRef.current && (hoveredMeshRef.current.material as THREE.MeshStandardMaterial).emissive) {
              const m = hoveredMeshRef.current.material as THREE.MeshStandardMaterial;
              m.emissive.setHex(hoveredMeshRef.current.userData.defaultEmissive || 0x000000);
              m.emissiveIntensity = 0.25;
            }
            hoveredMeshRef.current = hit;
            if ((hit.material as THREE.MeshStandardMaterial).emissive) {
              const m = hit.material as THREE.MeshStandardMaterial;
              m.emissive.setHex(0xf97316);
              m.emissiveIntensity = 0.95;
            }
          }

          if (hit.userData?.name) {
            setTooltipData({
              title: hit.userData.name,
              desc: hit.userData.desc,
              tag: hit.userData.tag,
              x: clientX,
              y: clientY
            });
          }
        } else {
          if (hoveredMeshRef.current) {
            if ((hoveredMeshRef.current.material as THREE.MeshStandardMaterial).emissive) {
              const m = hoveredMeshRef.current.material as THREE.MeshStandardMaterial;
              m.emissive.setHex(hoveredMeshRef.current.userData.defaultEmissive || 0x000000);
              m.emissiveIntensity = 0.25;
            }
            hoveredMeshRef.current = null;
          }
          setTooltipData(null);
        }
      }

      renderer.render(scene, camera);
    };

    // IntersectionObserver to pause rendering when scrolled out of view
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          if (!isVisible) {
            isVisible = true;
            animationFrameId = requestAnimationFrame(animate);
          }
        } else {
          isVisible = false;
          cancelAnimationFrame(animationFrameId);
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(container);

    // Initial launch
    animate();

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', onResize);
      canvas.removeEventListener('mousemove', onPointerMove);
      canvas.removeEventListener('click', onPointerClick);
      controls.dispose();
      renderer.dispose();
      groundGeo.dispose();
      groundMat.dispose();
      canopyRoofGeo.dispose();
      canopyRoofMat.dispose();
      fasciaGeo.dispose();
      fasciaMat.dispose();
      dustGeo.dispose();
      dustMat.dispose();
    };
  }, [updateEnvironmentLighting, onSelectDept, onNavigatePage]);

  // Sync controls autoRotate
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = autoRotate;
    }
  }, [autoRotate]);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-full overflow-hidden h-[70vh] sm:h-[76vh] min-h-[460px] max-h-[720px] bg-slate-100 select-none"
    >
      {/* FULL SCREEN 3D WEBGL CANVAS - ZERO BOXING, NATURAL SCROLL ENABLED */}
      <canvas
        ref={canvasRef}
        style={{ touchAction: 'pan-y' }}
        className="w-full h-full cursor-grab active:cursor-grabbing block"
      />

      {/* TOP MINIMAL STATUS BAR */}
      <div className="absolute top-4 left-4 sm:top-5 sm:left-6 right-4 sm:right-6 z-20 pointer-events-none flex items-center justify-between gap-3 max-w-[calc(100vw-2rem)]">
        {/* Status Badge */}
        <div className="flex items-center gap-2 bg-white/95 backdrop-blur-md border border-slate-200 px-3 sm:px-3.5 py-1.5 rounded-full shadow-md">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-[10px] sm:text-[11px] font-roboto font-bold tracking-wider text-slate-900 uppercase">
            3D DIGITAL TWIN · MASTER ENERGY FORECOURT
          </span>
        </div>

        {/* Minimalist Top-Right Quick Controls (Lighting & Auto Orbit) */}
        <div className="pointer-events-auto flex items-center gap-1.5 p-1 bg-white/95 backdrop-blur-md border border-slate-200 rounded-full shadow-md">
          {/* Cycle Lighting Button */}
          <button
            type="button"
            onClick={() => {
              const nextTime = timeOfDay === 'sunset' ? 'day' : timeOfDay === 'day' ? 'night' : 'sunset';
              setTimeOfDay(nextTime);
              updateEnvironmentLighting(nextTime);
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-roboto font-bold text-slate-800 hover:text-black rounded-full hover:bg-slate-100 transition-all cursor-pointer capitalize"
            title="Switch Day / Dusk / Night Lighting"
          >
            {timeOfDay === 'sunset' && <Sunset className="w-3.5 h-3.5 text-orange-500" />}
            {timeOfDay === 'day' && <Sun className="w-3.5 h-3.5 text-orange-500" />}
            {timeOfDay === 'night' && <Moon className="w-3.5 h-3.5 text-slate-700" />}
            <span className="hidden sm:inline">{timeOfDay}</span>
          </button>

          {/* Auto Rotate Toggle */}
          <button
            type="button"
            onClick={() => setAutoRotate(prev => !prev)}
            className={`p-1.5 rounded-full text-xs transition-all cursor-pointer ${
              autoRotate ? 'text-slate-950 bg-orange-500 font-bold' : 'text-slate-600 hover:text-black hover:bg-slate-100'
            }`}
            title={autoRotate ? 'Pause Orbit' : 'Resume Auto Orbit'}
          >
            {autoRotate ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* MINIMAL BOTTOM FLOATING DOCK (Clean, Uncluttered, White & Orange) */}
      <div className="absolute bottom-5 left-0 right-0 z-30 pointer-events-none flex flex-col items-center gap-2 px-3 w-full max-w-full">
        {/* Minimal View Selector */}
        <div className="pointer-events-auto flex items-center gap-1 p-1 bg-white/95 backdrop-blur-xl border border-slate-200 rounded-full shadow-xl max-w-[calc(100vw-2rem)] overflow-x-auto no-scrollbar">
          {[
            { id: 'forecourt', label: 'Fuel Forecourt' },
            { id: 'overview', label: 'Full Campus' },
            { id: 'totem', label: 'Price Totem' }
          ].map(sec => (
            <button
              key={sec.id}
              type="button"
              onClick={() => focusCamera(sec.id)}
              className={`px-3 py-1 text-xs font-inter font-semibold rounded-full transition-all cursor-pointer whitespace-nowrap ${
                activeSector === sec.id
                  ? 'bg-orange-500 text-slate-950 font-bold shadow-xs border border-orange-600'
                  : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
              }`}
            >
              {sec.label}
            </button>
          ))}
        </div>

        {/* PROMINENT SCROLL DOWN BUTTON - Mobile Contained */}
        <button
          type="button"
          onClick={() => {
            if (onScrollToContent) {
              onScrollToContent();
            } else {
              const el = document.getElementById('station-hero') || document.getElementById('station-details');
              el?.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="pointer-events-auto flex items-center justify-center gap-2 px-4 sm:px-5 py-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 rounded-full text-xs font-inter font-bold transition-all shadow-md shadow-orange-500/25 hover:scale-105 cursor-pointer active:scale-95 border border-orange-400 max-w-[calc(100vw-2rem)]"
        >
          <span className="truncate">Scroll down for station details &amp; prices</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-slate-950 shrink-0" />
        </button>
      </div>

      {/* RAYCASTER HOVER TOOLTIP POPUP */}
      {tooltipData && (
        <div
          style={{
            left: `${tooltipData.x}px`,
            top: `${tooltipData.y}px`
          }}
          className="absolute z-50 pointer-events-none -translate-x-1/2 -translate-y-full mb-3 bg-white/95 backdrop-blur-xl border border-orange-400 rounded-2xl px-4 py-3 shadow-2xl transition-all duration-150 text-left min-w-[240px] max-w-xs text-slate-900"
        >
          <div className="flex items-center gap-1.5 font-roboto text-[10px] font-bold text-orange-600 uppercase tracking-wider mb-1">
            <Sparkles className="w-3 h-3 text-orange-600" />
            <span>INTERACTIVE ASSET · CLICK TO OPEN</span>
          </div>
          <div className="text-sm font-bold text-slate-950 font-poppins">{tooltipData.title}</div>
          <div className="text-xs text-slate-600 font-opensans leading-snug mt-1">{tooltipData.desc}</div>
          <div className="mt-2 pt-2 border-t border-slate-200 text-[11px] font-roboto font-extrabold text-orange-700">
            {tooltipData.tag}
          </div>
        </div>
      )}
    </div>
  );
};
