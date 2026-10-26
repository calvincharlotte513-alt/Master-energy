import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { DepartmentId, PageId } from '../../types/hub';
import {
  Sun,
  Sunset,
  Moon,
  RotateCcw,
  Play,
  Pause,
  ChevronDown,
  Sparkles,
  Layers,
  Image as ImageIcon,
  Box,
  MapPin,
  Info,
  CheckCircle2,
  ChevronRight,
  ExternalLink
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

interface PhotorealHotspot {
  id: string;
  deptId: DepartmentId;
  xPercent: number;
  yPercent: number;
  title: string;
  tag: string;
  description: string;
  stat: string;
}

// ---------------------------------------------------------------------
// 1. PROCEDURAL CANVAS TEXTURE: ULTRA-MODERN CANOPY FASCIA (IMAGE 1)
// ---------------------------------------------------------------------
function createModernCanopyFasciaTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.Texture();

  // Dark obsidian/navy gradient backplate
  const grad = ctx.createLinearGradient(0, 0, 2048, 0);
  grad.addColorStop(0, '#060a14');
  grad.addColorStop(0.15, '#0b1328');
  grad.addColorStop(0.5, '#111d38');
  grad.addColorStop(0.85, '#0b1328');
  grad.addColorStop(1, '#060a14');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 2048, 256);

  // Subtle digital dot matrix pattern on the fascia (as seen in Image 1)
  ctx.fillStyle = 'rgba(56, 189, 248, 0.08)';
  for (let x = 20; x < 2028; x += 18) {
    for (let y = 18; y < 238; y += 18) {
      ctx.beginPath();
      ctx.arc(x, y, 2.2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Running illuminated cyan/white LED border rails on top and bottom
  ctx.fillStyle = '#38bdf8';
  ctx.shadowColor = '#38bdf8';
  ctx.shadowBlur = 12;
  ctx.fillRect(0, 0, 2048, 12);
  ctx.fillRect(0, 244, 2048, 12);
  ctx.shadowBlur = 0;

  // Thin inner pinstripe
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 12, 2048, 3);
  ctx.fillRect(0, 241, 2048, 3);

  // Left Chevron Group (>>> pointing toward text)
  const drawChevrons = (startX: number, direction: 'left' | 'right') => {
    ctx.shadowColor = '#00e5ff';
    ctx.shadowBlur = 18;
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 14;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    for (let i = 0; i < 4; i++) {
      const offset = i * 28;
      const x = direction === 'left' ? startX + offset : startX - offset;
      const dx = direction === 'left' ? 24 : -24;

      ctx.beginPath();
      ctx.moveTo(x - dx, 45);
      ctx.lineTo(x, 128);
      ctx.lineTo(x - dx, 211);
      ctx.stroke();
    }
    ctx.shadowBlur = 0;
  };

  drawChevrons(110, 'left');
  drawChevrons(1938, 'right');

  // "ME" Modern Emblem Badge on Left Center
  const emblemX = 310;
  const emblemY = 128;

  // Glowing outer halo
  ctx.shadowColor = '#ef4444';
  ctx.shadowBlur = 22;
  ctx.fillStyle = '#060a14';
  ctx.beginPath();
  ctx.ellipse(emblemX, emblemY, 78, 64, 0, 0, Math.PI * 2);
  ctx.fill();

  // Multi-color gradient ring (Navy, Gold, Crimson Red)
  const ringGrad = ctx.createLinearGradient(emblemX - 78, emblemY - 64, emblemX + 78, emblemY + 64);
  ringGrad.addColorStop(0, '#10b981');
  ringGrad.addColorStop(0.35, '#f59e0b');
  ringGrad.addColorStop(0.7, '#ef4444');
  ringGrad.addColorStop(1, '#38bdf8');
  ctx.strokeStyle = ringGrad;
  ctx.lineWidth = 9;
  ctx.stroke();
  ctx.shadowBlur = 0;

  // Stylized "ME" inside emblem
  ctx.fillStyle = '#ffffff';
  ctx.font = '900 52px "Poppins", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = '#ffffff';
  ctx.shadowBlur = 14;
  ctx.fillText('ME', emblemX, emblemY + 2);
  ctx.shadowBlur = 0;

  // Main Illuminated Bold Title: "MASTER ENERGY LTD"
  ctx.shadowColor = '#38bdf8';
  ctx.shadowBlur = 24;
  ctx.fillStyle = '#ffffff';
  ctx.font = '900 96px "Poppins", sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText('MASTER ENERGY LTD', 440, 128);
  ctx.shadowBlur = 0;

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// ---------------------------------------------------------------------
// 2. PROCEDURAL CANVAS TEXTURE: GEOMETRIC RECESSED LED CEILING (IMAGE 1)
// ---------------------------------------------------------------------
function createGeometricCeilingTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.Texture();

  // Modern architectural dark charcoal metallic soffit panels
  ctx.fillStyle = '#141822';
  ctx.fillRect(0, 0, 1024, 1024);

  // Subtle architectural modular ceiling grid lines
  ctx.strokeStyle = '#1e2433';
  ctx.lineWidth = 2;
  for (let x = 0; x <= 1024; x += 64) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 1024);
    ctx.stroke();
  }
  for (let y = 0; y <= 1024; y += 64) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(1024, y);
    ctx.stroke();
  }

  // 4 Column Pillar Hub Centers
  const columns = [
    { x: 280, y: 320 },
    { x: 744, y: 320 },
    { x: 280, y: 704 },
    { x: 744, y: 704 }
  ];

  // GEOMETRIC RECESSED LED TROUGHS (Radiating Diamond & X-Patterns as in Image 1)
  ctx.shadowColor = '#ffffff';
  ctx.shadowBlur = 18;
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 10;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'miter';

  // 1. Outer perimeter rectangular recessed LED trough
  ctx.strokeRect(60, 60, 904, 904);

  // 2. Central diamond uniting all 4 columns
  ctx.beginPath();
  ctx.moveTo(512, 140);
  ctx.lineTo(884, 512);
  ctx.lineTo(512, 884);
  ctx.lineTo(140, 512);
  ctx.closePath();
  ctx.stroke();

  // 3. Inner diamond between columns
  ctx.beginPath();
  ctx.moveTo(512, 320);
  ctx.lineTo(744, 512);
  ctx.lineTo(512, 704);
  ctx.lineTo(280, 512);
  ctx.closePath();
  ctx.stroke();

  // 4. Cross braces (X-pattern radiating from column heads)
  columns.forEach((col) => {
    // Diagonals extending to corners
    ctx.beginPath();
    ctx.moveTo(col.x, col.y);
    ctx.lineTo(col.x < 512 ? 60 : 964, col.y < 512 ? 60 : 964);
    ctx.stroke();

    // Diagonals towards center
    ctx.beginPath();
    ctx.moveTo(col.x, col.y);
    ctx.lineTo(512, 512);
    ctx.stroke();

    // Horizontal & vertical feeder light channels
    ctx.beginPath();
    ctx.moveTo(col.x, 60);
    ctx.lineTo(col.x, 964);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(60, col.y);
    ctx.lineTo(964, col.y);
    ctx.stroke();

    // Illuminated Circular Downlight Ring at Column Top
    ctx.beginPath();
    ctx.arc(col.x, col.y, 42, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.stroke();
  });

  // Central Starburst Ring
  ctx.beginPath();
  ctx.arc(512, 512, 28, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.stroke();

  ctx.shadowBlur = 0;

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// ---------------------------------------------------------------------
// 3. PROCEDURAL CANVAS TEXTURE: MODERN 2-STORY COMMERCIAL STOREFRONTS
// ---------------------------------------------------------------------
function createStorefrontBannerTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1536;
  canvas.height = 160;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.Texture();

  // Warm architectural bronze/timber panel
  const grad = ctx.createLinearGradient(0, 0, 0, 160);
  grad.addColorStop(0, '#221c17');
  grad.addColorStop(1, '#15110d');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1536, 160);

  // Store 1: "CAFÉ" (Left)
  ctx.shadowColor = '#fed7aa';
  ctx.shadowBlur = 15;
  ctx.fillStyle = '#ffffff';
  ctx.font = '800 58px "Poppins", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('CAFÉ', 240, 80);

  // Store 2: "BAR & RESTAURANT" (Center)
  ctx.shadowColor = '#fef08a';
  ctx.shadowBlur = 15;
  ctx.fillText('BAR & RESTAURANT', 760, 80);

  // Store 3: "CONVENIENCE STORE" (Right)
  ctx.shadowColor = '#38bdf8';
  ctx.shadowBlur = 15;
  ctx.fillText('CONVENIENCE STORE', 1280, 80);
  ctx.shadowBlur = 0;

  // Thin warm gold separator lines
  ctx.strokeStyle = '#b45309';
  ctx.lineWidth = 4;
  ctx.strokeRect(8, 8, 1520, 144);
  ctx.beginPath();
  ctx.moveTo(480, 10);
  ctx.lineTo(480, 150);
  ctx.moveTo(1040, 10);
  ctx.lineTo(1040, 150);
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// ---------------------------------------------------------------------
// 4. PROCEDURAL CANVAS TEXTURE: ROADSIDE DIGITAL PRICE TOTEM
// ---------------------------------------------------------------------
function createPriceTotemTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.Texture();

  // Dark obsidian backplate
  ctx.fillStyle = '#060a14';
  ctx.fillRect(0, 0, 512, 1024);

  // Outer gold frame
  ctx.strokeStyle = '#dfca95';
  ctx.lineWidth = 10;
  ctx.strokeRect(10, 10, 492, 1004);

  // Top Master Energy Brand Banner
  const headerGrad = ctx.createLinearGradient(0, 20, 0, 180);
  headerGrad.addColorStop(0, '#1e3a8a');
  headerGrad.addColorStop(1, '#0f1d3d');
  ctx.fillStyle = headerGrad;
  ctx.fillRect(20, 20, 472, 160);

  ctx.fillStyle = '#ffffff';
  ctx.font = '900 36px "Poppins", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('MASTER ENERGY', 256, 75);

  ctx.fillStyle = '#dfca95';
  ctx.font = 'bold 18px "Inter", sans-serif';
  ctx.fillText('NAZE MEGA FORECOURT', 256, 118);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 13px "JetBrains Mono", monospace';
  ctx.fillText('★ 24/7 DPR CERTIFIED ★', 256, 150);

  // 4 Calibrated Fuel Price Rows
  const fuelList = [
    { name: 'PMS', desc: 'PETROL', price: '₦710', color: '#ef4444', bar: '#dc2626' },
    { name: 'AGO', desc: 'DIESEL', price: '₦1050', color: '#34d399', bar: '#059669' },
    { name: 'DPK', desc: 'KEROSENE', price: '₦1150', color: '#dfca95', bar: '#b49b5c' },
    { name: 'LPG', desc: 'GAS / KG', price: '₦1400', color: '#38bdf8', bar: '#0284c7' }
  ];

  const startY = 205;
  const rowHeight = 175;

  fuelList.forEach((fuel, i) => {
    const y = startY + i * rowHeight;

    ctx.fillStyle = '#0d1322';
    ctx.beginPath();
    ctx.roundRect(26, y, 460, 155, 12);
    ctx.fill();

    ctx.fillStyle = fuel.bar;
    ctx.fillRect(26, y, 14, 155);

    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 2;
    ctx.strokeRect(26, y, 460, 155);

    ctx.fillStyle = '#ffffff';
    ctx.font = '900 42px "Poppins", sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(fuel.name, 56, y + 50);

    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 16px "Inter", sans-serif';
    ctx.fillText(fuel.desc, 56, y + 102);

    ctx.fillStyle = '#010307';
    ctx.fillRect(215, y + 26, 255, 103);
    ctx.strokeStyle = fuel.bar;
    ctx.lineWidth = 3;
    ctx.strokeRect(215, y + 26, 255, 103);

    ctx.shadowColor = fuel.color;
    ctx.shadowBlur = 10;
    ctx.fillStyle = fuel.color;
    ctx.font = '900 46px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText(fuel.price, 342, y + 78);
    ctx.shadowBlur = 0;
  });

  ctx.fillStyle = '#dfca95';
  ctx.font = 'bold 16px "Inter", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('10 LITERS IS 10 LITERS · ACCURATE METERS', 256, 940);
  ctx.fillStyle = '#94a3b8';
  ctx.font = '12px "Inter", sans-serif';
  ctx.fillText('KM 3 ABA-OWERRI ROAD, NAZE, IMO STATE', 256, 975);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// ---------------------------------------------------------------------
// 5. HELPER TO CREATE MODERN 3D SUVS & SEDANS (MATCHING IMAGE 1)
// ---------------------------------------------------------------------
function createModernVehicle(bodyColor: number, isSuv: boolean = true) {
  const group = new THREE.Group();

  const length = isSuv ? 4.7 : 4.4;
  const width = isSuv ? 2.1 : 1.95;
  const height = isSuv ? 1.45 : 1.15;

  // Car Body Base
  const bodyGeo = new THREE.BoxGeometry(width, height * 0.55, length);
  const bodyMat = new THREE.MeshStandardMaterial({
    color: bodyColor,
    metalness: 0.85,
    roughness: 0.18
  });
  const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
  bodyMesh.position.y = 0.55;
  bodyMesh.castShadow = true;
  group.add(bodyMesh);

  // Cabin / Greenhouse Roof with Tinted Glass
  const cabinLength = length * 0.62;
  const cabinWidth = width * 0.88;
  const cabinHeight = height * 0.55;
  const cabinGeo = new THREE.BoxGeometry(cabinWidth, cabinHeight, cabinLength);
  const cabinMat = new THREE.MeshStandardMaterial({
    color: 0x0a0e17,
    roughness: 0.1,
    metalness: 0.9,
    transparent: true,
    opacity: 0.85
  });
  const cabinMesh = new THREE.Mesh(cabinGeo, cabinMat);
  cabinMesh.position.set(0, 0.55 + height * 0.5, -length * 0.05);
  cabinMesh.castShadow = true;
  group.add(cabinMesh);

  // Roof Roof-Rails on SUV
  if (isSuv) {
    const railGeo = new THREE.BoxGeometry(0.08, 0.08, cabinLength * 0.9);
    const railMat = new THREE.MeshStandardMaterial({ color: 0xcbd5e1, metalness: 0.9, roughness: 0.2 });
    const railL = new THREE.Mesh(railGeo, railMat);
    railL.position.set(-cabinWidth * 0.46, 0.55 + height * 0.82, -length * 0.05);
    group.add(railL);

    const railR = new THREE.Mesh(railGeo, railMat);
    railR.position.set(cabinWidth * 0.46, 0.55 + height * 0.82, -length * 0.05);
    group.add(railR);
  }

  // 4 Alloy Wheels with Rubber Tires
  const wheelGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.28, 16);
  const tireMat = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.9 });
  wheelGeo.rotateZ(Math.PI / 2);

  const wheelPositions = [
    [-width * 0.52, 0.38, length * 0.32],
    [width * 0.52, 0.38, length * 0.32],
    [-width * 0.52, 0.38, -length * 0.32],
    [width * 0.52, 0.38, -length * 0.32]
  ];

  wheelPositions.forEach(([wx, wy, wz]) => {
    const wheel = new THREE.Mesh(wheelGeo, tireMat);
    wheel.position.set(wx, wy, wz);
    wheel.castShadow = true;
    group.add(wheel);

    // Silver Alloy Hubcap
    const hub = new THREE.Mesh(
      new THREE.CylinderGeometry(0.22, 0.22, 0.3, 12),
      new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.95, roughness: 0.15 })
    );
    hub.rotateZ(Math.PI / 2);
    hub.position.set(wx, wy, wz);
    group.add(hub);
  });

  // LED Headlights (Glowing Crisp White / Cyan)
  const headlightMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  [-width * 0.36, width * 0.36].forEach((hx) => {
    const hl = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.12, 0.05), headlightMat);
    hl.position.set(hx, 0.62, length * 0.5 + 0.02);
    group.add(hl);
  });

  // LED Taillights (Glowing Red)
  const taillightMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
  [-width * 0.36, width * 0.36].forEach((tx) => {
    const tl = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.12, 0.05), taillightMat);
    tl.position.set(tx, 0.62, -length * 0.5 - 0.02);
    group.add(tl);
  });

  return group;
}

// ---------------------------------------------------------------------
// MAIN COMPONENT
// ---------------------------------------------------------------------
export const MainStation3DTwin: React.FC<MainStation3DTwinProps> = ({
  activeDept,
  onSelectDept,
  onNavigatePage,
  onOpenDeptDetail,
  onScrollToContent
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Default to 'sunset' (Twilight Dusk) to exactly match Image 1!
  const [timeOfDay, setTimeOfDay] = useState<'sunset' | 'day' | 'night'>('sunset');
  const [displayMode, setDisplayMode] = useState<'3d-model' | 'photoreal'>('3d-model');
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [tooltipData, setTooltipData] = useState<HoverTooltipData | null>(null);
  const [activeSector, setActiveSector] = useState<string>('forecourt');
  const [selectedPhotorealHotspot, setSelectedPhotorealHotspot] = useState<PhotorealHotspot | null>(null);

  // Three.js runtime refs
  const controlsRef = useRef<OrbitControls | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const interactiveObjectsRef = useRef<THREE.Mesh[]>([]);
  const hoveredMeshRef = useRef<THREE.Mesh | null>(null);

  const lightsRef = useRef<{
    ambient: THREE.AmbientLight;
    dir: THREE.DirectionalLight;
    hemi: THREE.HemisphereLight;
    forecourtLight: THREE.PointLight;
    totemLight: THREE.PointLight;
    buildingLight: THREE.PointLight;
    soffitLights: THREE.PointLight[];
  } | null>(null);

  const targetCamPosRef = useRef<THREE.Vector3 | null>(null);
  const targetLookAtRef = useRef<THREE.Vector3 | null>(null);

  // Hotspots for the Photoreal Architectural Twin (Matching Image 1)
  const photorealHotspots: PhotorealHotspot[] = [
    {
      id: 'hs-canopy',
      deptId: 'oil-gas',
      xPercent: 32,
      yPercent: 32,
      title: 'Architectural Geometric LED Canopy',
      tag: 'FLAGSHIP ROOF · 16 NOZZLES',
      description: 'Ultra-modern high-clearance canopy with illuminated chevron fascia and signature diamond-grid recessed LED ceiling channels.',
      stat: '16 High-Flow DPR Dispensers'
    },
    {
      id: 'hs-pumps',
      deptId: 'oil-gas',
      xPercent: 38,
      yPercent: 74,
      title: 'Digital High-Speed Dispensers & Fleet Attendants',
      tag: 'CERTIFIED METERS · ZERO SHORT-CHANGE',
      description: 'Trained station attendants dispensing certified PMS, AGO, and DPK with electronic tamper-proof digital meters.',
      stat: 'PMS ₦710/L · AGO ₦1,050/L'
    },
    {
      id: 'hs-cafe',
      deptId: 'kitchen',
      xPercent: 62,
      yPercent: 60,
      title: 'Masters Café & Espresso Bar',
      tag: 'GROUND FLOOR CULINARY',
      description: 'Artisan coffee, fresh meat pies, pastries, cold juices, and gourmet breakfast for transit travelers.',
      stat: 'Open 6:00 AM – Midnight'
    },
    {
      id: 'hs-restaurant',
      deptId: 'kitchen',
      xPercent: 72,
      yPercent: 60,
      title: 'Masters Bar & Restaurant',
      tag: 'AUTHENTIC DINE-IN HALL',
      description: 'Air-conditioned dining lounge serving hot authentic Ofe Owerri, party jollof rice, pepper soup, and chilled drinks.',
      stat: 'Lunch & Dinner Full Service'
    },
    {
      id: 'hs-store',
      deptId: 'oil-gas',
      xPercent: 84,
      yPercent: 60,
      title: '24/7 Mega Convenience Store & Mini-Mart',
      tag: 'RETAIL SUPERMARKET',
      description: 'Fully stocked forecourt supermarket with groceries, ice-cold beverages, automotive engine oils, and travel accessories.',
      stat: 'Open 24 Hours Daily'
    },
    {
      id: 'hs-totem',
      deptId: 'oil-gas',
      xPercent: 3,
      yPercent: 55,
      title: 'Roadside LED Price Totem Billboard',
      tag: 'HIGHWAY BEACON · TRANSPARENCY',
      description: 'High-visibility digital LED rate totem along Aba-Owerri Expressway for incoming highway motorists.',
      stat: '24/7 Calibrated Live Rates'
    }
  ];

  // Update lighting to match Image 1's Twilight Blue Hour
  const updateEnvironmentLighting = useCallback((time: 'sunset' | 'day' | 'night') => {
    if (!sceneRef.current || !lightsRef.current) return;
    const { ambient, dir, hemi, forecourtLight, totemLight, buildingLight, soffitLights } = lightsRef.current;

    if (time === 'sunset') {
      // TWILIGHT / DUSK BLUE HOUR (Exact Aesthetic of Image 1)
      sceneRef.current.background = new THREE.Color(0x131d2e);
      sceneRef.current.fog = new THREE.FogExp2(0x131d2e, 0.009);

      ambient.color.setHex(0x1e2d4d);
      ambient.intensity = 0.85;

      hemi.color.setHex(0xf59e0b);
      hemi.groundColor.setHex(0x0f172a);
      hemi.intensity = 0.65;

      dir.color.setHex(0xf59e0b);
      dir.intensity = 2.2;
      dir.position.set(28, 18, -15);

      forecourtLight.intensity = 4.8;
      forecourtLight.color.setHex(0xffffff);

      totemLight.intensity = 3.2;
      totemLight.color.setHex(0x38bdf8);

      buildingLight.intensity = 3.8;
      buildingLight.color.setHex(0xfed7aa);

      soffitLights.forEach((sl) => {
        sl.intensity = 3.2;
        sl.color.setHex(0xffffff);
      });
    } else if (time === 'day') {
      // Crisp daylight
      sceneRef.current.background = new THREE.Color(0xf1f5f9);
      sceneRef.current.fog = new THREE.FogExp2(0xf1f5f9, 0.009);

      ambient.color.setHex(0xffffff);
      ambient.intensity = 1.3;

      hemi.color.setHex(0xffffff);
      hemi.groundColor.setHex(0xe2e8f0);
      hemi.intensity = 0.9;

      dir.color.setHex(0xfffbeb);
      dir.intensity = 3.2;
      dir.position.set(20, 32, 16);

      forecourtLight.intensity = 2.2;
      forecourtLight.color.setHex(0xffffff);

      totemLight.intensity = 2.2;
      totemLight.color.setHex(0x38bdf8);

      buildingLight.intensity = 1.6;
      buildingLight.color.setHex(0xfed7aa);

      soffitLights.forEach((sl) => {
        sl.intensity = 1.8;
        sl.color.setHex(0xffffff);
      });
    } else {
      // Midnight Illumination
      sceneRef.current.background = new THREE.Color(0x050811);
      sceneRef.current.fog = new THREE.FogExp2(0x050811, 0.015);

      ambient.color.setHex(0x0f172a);
      ambient.intensity = 0.45;

      hemi.color.setHex(0x38bdf8);
      hemi.groundColor.setHex(0x020617);
      hemi.intensity = 0.35;

      dir.color.setHex(0x38bdf8);
      dir.intensity = 0.6;
      dir.position.set(12, 22, 12);

      forecourtLight.intensity = 6.2;
      forecourtLight.color.setHex(0xffffff);

      totemLight.intensity = 4.5;
      totemLight.color.setHex(0x00e5ff);

      buildingLight.intensity = 4.8;
      buildingLight.color.setHex(0xfbbf24);

      soffitLights.forEach((sl) => {
        sl.intensity = 4.2;
        sl.color.setHex(0xffffff);
      });
    }
  }, []);

  // Smooth camera glide
  const focusCamera = (sectorId: string) => {
    setActiveSector(sectorId);

    const targetPos = new THREE.Vector3();
    const targetLook = new THREE.Vector3();

    if (sectorId === 'forecourt' || sectorId === 'oil-gas') {
      targetLook.set(0, 2.5, 4.5);
      targetPos.set(4, 5.8, 19);
      onSelectDept('oil-gas');
    } else if (sectorId === 'canopy') {
      targetLook.set(0, 5.2, 5.0);
      targetPos.set(0, 3.2, 15);
      onSelectDept('oil-gas');
    } else if (sectorId === 'store' || sectorId === 'kitchen') {
      targetLook.set(9.5, 3.2, -1.0);
      targetPos.set(12, 5.5, 12);
      onSelectDept('kitchen');
    } else if (sectorId === 'totem') {
      targetLook.set(-13, 4.5, 11);
      targetPos.set(-9, 5.5, 19);
      onSelectDept('oil-gas');
    } else if (sectorId === 'overview') {
      targetLook.set(2, 2.2, 2);
      targetPos.set(26, 18, 30);
    }

    targetCamPosRef.current = targetPos;
    targetLookAtRef.current = targetLook;
  };

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas || displayMode !== '3d-model') return;

    // 1. SCENE
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x131d2e);
    scene.fog = new THREE.FogExp2(0x131d2e, 0.009);

    // 2. CAMERA
    const width = container.clientWidth;
    const height = container.clientHeight;
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 260);
    camera.position.set(22, 15, 27);
    cameraRef.current = camera;

    // 3. RENDERER
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 4. ORBITCONTROLS
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2.04;
    controls.minDistance = 6;
    controls.maxDistance = 75;
    controls.target.set(1.5, 2.6, 3.5);
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 0.6;
    controls.enableZoom = false;
    controls.enablePan = false;
    controlsRef.current = controls;

    // 5. LIGHTING SETUP
    const ambientLight = new THREE.AmbientLight(0x1e2d4d, 0.85);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xf59e0b, 0x0f172a, 0.65);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xf59e0b, 2.2);
    dirLight.position.set(28, 18, -15);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 80;
    dirLight.shadow.camera.left = -25;
    dirLight.shadow.camera.right = 25;
    dirLight.shadow.camera.top = 25;
    dirLight.shadow.camera.bottom = -25;
    dirLight.shadow.bias = -0.001;
    scene.add(dirLight);

    // Central Forecourt Downlight
    const forecourtLight = new THREE.PointLight(0xffffff, 4.8, 26, 1.4);
    forecourtLight.position.set(0, 5.2, 5.0);
    scene.add(forecourtLight);

    // Totem Light
    const totemLight = new THREE.PointLight(0x38bdf8, 3.2, 16, 1.5);
    totemLight.position.set(-13, 5.2, 11);
    scene.add(totemLight);

    // Building Warm Interior Storefront Light
    const buildingLight = new THREE.PointLight(0xfed7aa, 3.8, 22, 1.3);
    buildingLight.position.set(9.5, 3.8, 2.0);
    scene.add(buildingLight);

    // Under-Canopy Soffit Lights (Placed at 4 column heads)
    const soffitLights: THREE.PointLight[] = [];
    [
      [-5.2, 4.8, 2.2],
      [5.2, 4.8, 2.2],
      [-5.2, 4.8, 7.8],
      [5.2, 4.8, 7.8]
    ].forEach(([sx, sy, sz]) => {
      const sLight = new THREE.PointLight(0xffffff, 3.2, 14, 1.5);
      sLight.position.set(sx, sy, sz);
      scene.add(sLight);
      soffitLights.push(sLight);
    });

    lightsRef.current = {
      ambient: ambientLight,
      dir: dirLight,
      hemi: hemiLight,
      forecourtLight,
      totemLight,
      buildingLight,
      soffitLights
    };

    // 6. BUILD HIGH-FIDELITY 3D ARCHITECTURAL ASSETS (MATCHING IMAGE 1)
    const interactiveObjects: THREE.Mesh[] = [];

    // Tarmac Ground Plane
    const groundGeo = new THREE.PlaneGeometry(90, 90);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x141822,
      roughness: 0.72,
      metalness: 0.22
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Concrete Highway Apron & Entry Curb
    const curbGeo = new THREE.BoxGeometry(42, 0.22, 1.6);
    const curbMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.65, metalness: 0.2 });
    const curb = new THREE.Mesh(curbGeo, curbMat);
    curb.position.set(0, 0.11, 14.5);
    curb.receiveShadow = true;
    scene.add(curb);

    // Crisp Painted Road Markings: Directional Arrows & Pump Bays
    const whiteMarkingMat = new THREE.MeshBasicMaterial({ color: 0xf8fafc });
    [-7.8, -2.6, 2.6, 7.8].forEach((lx) => {
      const line = new THREE.Mesh(new THREE.PlaneGeometry(0.18, 12), whiteMarkingMat);
      line.rotation.x = -Math.PI / 2;
      line.position.set(lx, 0.02, 5.0);
      scene.add(line);
    });

    // Zebra pedestrian crossing leading to convenience store & café
    for (let z = 0; z < 8; z++) {
      const stripe = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 0.42), whiteMarkingMat);
      stripe.rotation.x = -Math.PI / 2;
      stripe.position.set(5.5, 0.02, -0.5 + z * 0.72);
      scene.add(stripe);
    }

    // A. ULTRA-MODERN CANOPY (MATCHING IMAGE 1)
    const canopyWidth = 22.5;
    const canopyDepth = 15.0;
    const canopyHeight = 0.65;

    // Main Canopy Box Body
    const canopyRoofGeo = new THREE.BoxGeometry(canopyWidth, canopyHeight, canopyDepth);
    const canopyRoofMat = new THREE.MeshStandardMaterial({
      color: 0x0a0f1d,
      roughness: 0.22,
      metalness: 0.75
    });
    const canopy = new THREE.Mesh(canopyRoofGeo, canopyRoofMat);
    canopy.position.set(0, 5.4, 5.0);
    canopy.castShadow = true;
    canopy.receiveShadow = true;
    canopy.userData = {
      name: 'Master Energy Architectural Canopy',
      desc: 'High-clearance modern canopy with illuminated chevrons and geometric recessed diamond ceiling lights',
      tag: '16 NOZZLES · DPR CERTIFIED',
      dept: 'oil-gas'
    };
    scene.add(canopy);
    interactiveObjects.push(canopy);

    // Glowing Neon Perimeter Border Ribbon (Running along the outer edge)
    const rimGeo = new THREE.BoxGeometry(canopyWidth + 0.15, 0.12, canopyDepth + 0.15);
    const rimMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x00e5ff,
      emissiveIntensity: 0.95
    });
    const rimTop = new THREE.Mesh(rimGeo, rimMat);
    rimTop.position.set(0, 5.4 + canopyHeight / 2, 5.0);
    scene.add(rimTop);

    const rimBottom = new THREE.Mesh(rimGeo, rimMat);
    rimBottom.position.set(0, 5.4 - canopyHeight / 2, 5.0);
    scene.add(rimBottom);

    // Fascia Billboard Texture (Front & Sides)
    const fasciaTex = createModernCanopyFasciaTexture();
    const fasciaGeoFront = new THREE.PlaneGeometry(canopyWidth, canopyHeight - 0.04);
    const fasciaMat = new THREE.MeshBasicMaterial({ map: fasciaTex, toneMapped: false });

    // Front Face (Facing highway entrance)
    const fasciaFront = new THREE.Mesh(fasciaGeoFront, fasciaMat);
    fasciaFront.position.set(0, 5.4, 5.0 + canopyDepth / 2 + 0.02);
    scene.add(fasciaFront);

    // Rear Face
    const fasciaRear = new THREE.Mesh(fasciaGeoFront, fasciaMat);
    fasciaRear.position.set(0, 5.4, 5.0 - canopyDepth / 2 - 0.02);
    fasciaRear.rotation.y = Math.PI;
    scene.add(fasciaRear);

    // Left Side Face
    const fasciaGeoSide = new THREE.PlaneGeometry(canopyDepth, canopyHeight - 0.04);
    const fasciaLeft = new THREE.Mesh(fasciaGeoSide, fasciaMat);
    fasciaLeft.position.set(-canopyWidth / 2 - 0.02, 5.4, 5.0);
    fasciaLeft.rotation.y = -Math.PI / 2;
    scene.add(fasciaLeft);

    // Right Side Face
    const fasciaRight = new THREE.Mesh(fasciaGeoSide, fasciaMat);
    fasciaRight.position.set(canopyWidth / 2 + 0.02, 5.4, 5.0);
    fasciaRight.rotation.y = Math.PI / 2;
    scene.add(fasciaRight);

    // CANOPY SOFFIT CEILING WITH GEOMETRIC DIAMOND RECESSED LED CHANNELS
    const ceilingTex = createGeometricCeilingTexture();
    const ceilingGeo = new THREE.PlaneGeometry(canopyWidth - 0.1, canopyDepth - 0.1);
    const ceilingMat = new THREE.MeshBasicMaterial({
      map: ceilingTex,
      toneMapped: false
    });
    const ceiling = new THREE.Mesh(ceilingGeo, ceilingMat);
    ceiling.position.set(0, 5.4 - canopyHeight / 2 - 0.01, 5.0);
    ceiling.rotation.x = Math.PI / 2;
    scene.add(ceiling);

    // 4 Modern Cylindrical Canopy Columns with Flared Illuminated Capitals
    const columnGeo = new THREE.CylinderGeometry(0.34, 0.34, 5.0, 24);
    const columnMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      metalness: 0.88,
      roughness: 0.2
    });
    const capitalMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.75
    });

    [
      [-5.2, 2.5, 2.2],
      [5.2, 2.5, 2.2],
      [-5.2, 2.5, 7.8],
      [5.2, 2.5, 7.8]
    ].forEach(([cx, cy, cz]) => {
      const col = new THREE.Mesh(columnGeo, columnMat);
      col.position.set(cx, cy, cz);
      col.castShadow = true;
      scene.add(col);

      // Flared capital connecting column head to geometric ceiling
      const cap = new THREE.Mesh(new THREE.ConeGeometry(0.85, 0.45, 16), capitalMat);
      cap.position.set(cx, 5.0, cz);
      scene.add(cap);

      // Crimson safety base bollard collar
      const bollard = new THREE.Mesh(
        new THREE.CylinderGeometry(0.48, 0.48, 0.7, 16),
        new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.4 })
      );
      bollard.position.set(cx, 0.35, cz);
      scene.add(bollard);
    });

    // B. PUMP ISLANDS & MODERN DIGITAL DISPENSERS
    const islandGeo = new THREE.BoxGeometry(2.2, 0.28, 9.6);
    const islandMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.55, metalness: 0.3 });

    const islandL = new THREE.Mesh(islandGeo, islandMat);
    islandL.position.set(-5.2, 0.14, 5.0);
    scene.add(islandL);

    const islandR = new THREE.Mesh(islandGeo, islandMat);
    islandR.position.set(5.2, 0.14, 5.0);
    scene.add(islandR);

    // 4 Digital Dispensers with LED screens and hoses
    const dispensersData = [
      { pos: [-5.2, 1.25, 2.8], name: 'PMS Dispenser Bay 1-4', tag: 'PMS: ₦710/L' },
      { pos: [-5.2, 1.25, 7.2], name: 'PMS Fast Dispenser Bay 5-8', tag: 'PMS: ₦710/L' },
      { pos: [5.2, 1.25, 2.8], name: 'AGO Commercial Heavy Diesel Bay 9-12', tag: 'AGO: ₦1,050/L' },
      { pos: [5.2, 1.25, 7.2], name: 'DPK Kerosene & LPG Gas Bay 13-16', tag: 'DPK: ₦1,150/L' }
    ];

    const dispenserBodyGeo = new THREE.BoxGeometry(0.92, 2.1, 0.92);
    const dispenserMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.8,
      roughness: 0.22,
      emissive: 0x0f172a,
      emissiveIntensity: 0.2
    });

    dispensersData.forEach((d) => {
      const pMesh = new THREE.Mesh(dispenserBodyGeo, dispenserMat);
      pMesh.position.set(d.pos[0], d.pos[1], d.pos[2]);
      pMesh.castShadow = true;
      pMesh.userData = {
        name: d.name,
        desc: 'Certified DPR digital volume meter with electronic tamper-proof security seals.',
        tag: d.tag,
        dept: 'oil-gas'
      };
      scene.add(pMesh);
      interactiveObjects.push(pMesh);

      // Backlit Digital LED Volume Screen
      const screen = new THREE.Mesh(
        new THREE.PlaneGeometry(0.52, 0.35),
        new THREE.MeshBasicMaterial({ color: 0x10b981 })
      );
      screen.position.set(d.pos[0] + 0.47, d.pos[1] + 0.38, d.pos[2]);
      screen.rotation.y = Math.PI / 2;
      scene.add(screen);
    });

    // C. 2-STORY COMMERCIAL LIFESTYLE COMPLEX (RIGHT & REAR, MATCHING IMAGE 1)
    const bldgWidth = 20.5;
    const bldgHeight = 7.6;
    const bldgDepth = 15.5;
    const bldgX = 14.5;
    const bldgZ = -1.5;

    // Building Structure
    const bldgBody = new THREE.Mesh(
      new THREE.BoxGeometry(bldgWidth, bldgHeight, bldgDepth),
      new THREE.MeshStandardMaterial({
        color: 0x171d2b,
        roughness: 0.35,
        metalness: 0.55
      })
    );
    bldgBody.position.set(bldgX, bldgHeight / 2, bldgZ);
    bldgBody.castShadow = true;
    bldgBody.receiveShadow = true;
    bldgBody.userData = {
      name: 'Masters Commercial Lifestyle Complex',
      desc: 'Two-story architectural center featuring Café, Restaurant, and 24/7 Supermarket.',
      tag: 'CAFÉ · RESTAURANT · STORE',
      dept: 'kitchen'
    };
    scene.add(bldgBody);
    interactiveObjects.push(bldgBody);

    // Warm Architectural Timber/Bronze Louver Framing
    const frameGeo = new THREE.BoxGeometry(bldgWidth + 0.2, 0.35, bldgDepth + 0.2);
    const woodMat = new THREE.MeshStandardMaterial({
      color: 0x78350f,
      roughness: 0.45,
      metalness: 0.35
    });

    const f1 = new THREE.Mesh(frameGeo, woodMat);
    f1.position.set(bldgX, 0.18, bldgZ);
    scene.add(f1);

    const f2 = new THREE.Mesh(frameGeo, woodMat);
    f2.position.set(bldgX, 3.8, bldgZ);
    scene.add(f2);

    const f3 = new THREE.Mesh(frameGeo, woodMat);
    f3.position.set(bldgX, bldgHeight, bldgZ);
    scene.add(f3);

    // Ground-Floor Floor-to-Ceiling Glass Curtain Wall with Warm Interior Glow
    const glassMat = new THREE.MeshStandardMaterial({
      color: 0xfef08a,
      emissive: 0xfbbf24,
      emissiveIntensity: 0.35,
      roughness: 0.08,
      metalness: 0.95,
      transparent: true,
      opacity: 0.68
    });
    const groundGlass = new THREE.Mesh(new THREE.PlaneGeometry(bldgWidth - 0.4, 3.4), glassMat);
    groundGlass.position.set(bldgX, 1.9, bldgZ + bldgDepth / 2 + 0.02);
    scene.add(groundGlass);

    // Storefront Fascia Banner: "CAFÉ", "BAR & RESTAURANT", "CONVENIENCE STORE"
    const storeTex = createStorefrontBannerTexture();
    const storeBanner = new THREE.Mesh(
      new THREE.PlaneGeometry(bldgWidth - 0.4, 1.15),
      new THREE.MeshBasicMaterial({ map: storeTex, toneMapped: false })
    );
    storeBanner.position.set(bldgX, 3.8 - 0.6, bldgZ + bldgDepth / 2 + 0.04);
    scene.add(storeBanner);

    // Upper-Floor Executive Glass Curtain Wall
    const upperGlassMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.25,
      roughness: 0.08,
      metalness: 0.95,
      transparent: true,
      opacity: 0.62
    });
    const upperGlass = new THREE.Mesh(new THREE.PlaneGeometry(bldgWidth - 0.4, 3.4), upperGlassMat);
    upperGlass.position.set(bldgX, 5.7, bldgZ + bldgDepth / 2 + 0.02);
    scene.add(upperGlass);

    // D. MODERN VEHICLES (DIRECTLY REPLICATING IMAGE 1)
    // Vehicle 1: Pearl White Luxury SUV (Land Cruiser / Prado parked at Bay 1)
    const suvWhite = createModernVehicle(0xf8fafc, true);
    suvWhite.position.set(0, 0, 4.5);
    suvWhite.rotation.y = -Math.PI / 18;
    scene.add(suvWhite);

    // Vehicle 2: Dark Metallic Charcoal Luxury SUV at Pump Bay 2
    const suvDark = createModernVehicle(0x1e293b, true);
    suvDark.position.set(-5.2, 0, 5.2);
    scene.add(suvDark);

    // Vehicle 3: Silver Sedan entering forecourt lane
    const sedanSilver = createModernVehicle(0x94a3b8, false);
    sedanSilver.position.set(-8.5, 0, 11.5);
    sedanSilver.rotation.y = -Math.PI / 12;
    scene.add(sedanSilver);

    // E. ROADSIDE DIGITAL PRICE TOTEM BILLBOARD (Highway Entry)
    const totemPylonGeo = new THREE.BoxGeometry(2.1, 9.2, 0.85);
    const totemPylonMat = new THREE.MeshStandardMaterial({
      color: 0x070a12,
      metalness: 0.85,
      roughness: 0.18
    });
    const totemPylon = new THREE.Mesh(totemPylonGeo, totemPylonMat);
    totemPylon.position.set(-13, 4.6, 11);
    totemPylon.castShadow = true;
    totemPylon.userData = {
      name: 'Master Energy Roadside Price Totem Billboard',
      desc: 'Real-time DPR calibrated rates: PMS ₦710 · AGO ₦1,050 · DPK ₦1,150 · LPG ₦1,400',
      tag: 'PMS ₦710 · AGO ₦1,050 · DPK ₦1,150 · LPG ₦1,400',
      dept: 'oil-gas'
    };
    scene.add(totemPylon);
    interactiveObjects.push(totemPylon);

    // Dynamic Price Screen Texture
    const totemTex = createPriceTotemTexture();
    const totemBoardGeo = new THREE.PlaneGeometry(1.88, 7.2);
    const totemBoardMat = new THREE.MeshBasicMaterial({ map: totemTex, toneMapped: false });

    const totemFront = new THREE.Mesh(totemBoardGeo, totemBoardMat);
    totemFront.position.set(-13, 4.8, 11.44);
    scene.add(totemFront);

    const totemBack = new THREE.Mesh(totemBoardGeo, totemBoardMat);
    totemBack.position.set(-13, 4.8, 10.56);
    totemBack.rotation.y = Math.PI;
    scene.add(totemBack);

    // F. PERIMETER TROPICAL PALM TREES & GREEN BUFFER (Background of Image 1)
    const palmTrunkGeo = new THREE.CylinderGeometry(0.18, 0.28, 6.2, 10);
    const palmTrunkMat = new THREE.MeshStandardMaterial({ color: 0x451a03, roughness: 0.85 });
    const palmFrondGeo = new THREE.ConeGeometry(2.4, 1.8, 8);
    const palmFrondMat = new THREE.MeshStandardMaterial({ color: 0x14532d, roughness: 0.7 });

    [-18, -14, -10, -6, 2, 6, 26, 30].forEach((px) => {
      const palm = new THREE.Group();
      const trunk = new THREE.Mesh(palmTrunkGeo, palmTrunkMat);
      trunk.position.y = 3.1;
      palm.add(trunk);

      const fronds = new THREE.Mesh(palmFrondGeo, palmFrondMat);
      fronds.position.y = 6.2;
      palm.add(fronds);

      palm.position.set(px, 0, -11.5);
      scene.add(palm);
    });

    interactiveObjectsRef.current = interactiveObjects;

    // 7. INTERACTION / RAYCASTING
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
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

    const onPointerClick = () => {
      if (hoveredMeshRef.current?.userData?.dept) {
        onSelectDept(hoveredMeshRef.current.userData.dept);
      }
    };

    canvas.addEventListener('mousemove', onPointerMove);
    canvas.addEventListener('click', onPointerClick);

    const onResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', onResize);

    // 8. RENDER LOOP
    let animationFrameId: number;
    let isVisible = true;
    let lastRaycastTime = 0;

    const animate = () => {
      if (!isVisible) return;
      animationFrameId = requestAnimationFrame(animate);

      if (targetCamPosRef.current && targetLookAtRef.current) {
        camera.position.lerp(targetCamPosRef.current, 0.05);
        controls.target.lerp(targetLookAtRef.current, 0.05);

        if (camera.position.distanceTo(targetCamPosRef.current) < 0.1) {
          targetCamPosRef.current = null;
          targetLookAtRef.current = null;
        }
      }

      controls.update();

      const now = performance.now();
      if (mouseMoved && now - lastRaycastTime > 45) {
        lastRaycastTime = now;
        mouseMoved = false;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(interactiveObjectsRef.current);

        if (intersects.length > 0) {
          const hit = intersects[0].object as THREE.Mesh;
          if (hoveredMeshRef.current !== hit) {
            hoveredMeshRef.current = hit;
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
          hoveredMeshRef.current = null;
          setTooltipData(null);
        }
      }

      renderer.render(scene, camera);
    };

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
    };
  }, [updateEnvironmentLighting, onSelectDept, displayMode]);

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = autoRotate;
    }
  }, [autoRotate]);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-full overflow-hidden h-[74vh] sm:h-[80vh] min-h-[500px] max-h-[760px] bg-[#090d16] select-none transition-all duration-300"
    >
      {/* ========================================================= */}
      {/* MODE 1: 3D INTERACTIVE WEBGL MODEL (MODERNIZED TO IMAGE 1) */}
      {/* ========================================================= */}
      {displayMode === '3d-model' ? (
        <canvas
          ref={canvasRef}
          style={{ touchAction: 'pan-y' }}
          className="w-full h-full cursor-grab active:cursor-grabbing block"
        />
      ) : (
        /* ========================================================= */
        /* MODE 2: PHOTOREAL ARCHITECTURAL TWIN (DIRECT IMAGE 1)     */
        /* ========================================================= */
        <div className="relative w-full h-full overflow-hidden bg-slate-950 flex items-center justify-center">
          <img
            src="/images/modern_master_energy_reference.png"
            alt="Master Energy Ltd Modern Mega Station Architecture"
            className="w-full h-full object-cover object-center select-none filter contrast-[1.03]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/25 pointer-events-none" />

          {/* Interactive Pulsing Hotspot Pins */}
          {photorealHotspots.map((hs, index) => {
            const isSelected = selectedPhotorealHotspot?.id === hs.id;
            return (
              <button
                key={hs.id}
                type="button"
                style={{ left: `${hs.xPercent}%`, top: `${hs.yPercent}%` }}
                onClick={() => {
                  setSelectedPhotorealHotspot(hs);
                  onSelectDept(hs.deptId);
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 group/pin z-20 cursor-pointer focus:outline-none"
                aria-label={hs.title}
              >
                <span className="relative flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center">
                  <span
                    className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                      isSelected ? 'bg-cyan-400' : 'bg-red-500'
                    }`}
                  />
                  <span
                    className={`relative inline-flex items-center justify-center rounded-full h-7 w-7 sm:h-8 sm:w-8 border-2 border-white shadow-xl text-white font-mono font-extrabold text-xs transition-transform group-hover/pin:scale-110 ${
                      isSelected ? 'bg-cyan-500 scale-110 shadow-cyan-500/50' : 'bg-red-600 shadow-red-600/50'
                    }`}
                  >
                    {index + 1}
                  </span>
                </span>

                {/* Floating Micro Tooltip */}
                <div className="opacity-0 group-hover/pin:opacity-100 transition-opacity absolute bottom-full left-1/2 -translate-x-1/2 mb-2 pointer-events-none whitespace-nowrap bg-slate-950/95 backdrop-blur-md text-white text-[11px] font-mono font-bold px-3 py-1.5 rounded-lg border border-cyan-400/50 shadow-2xl">
                  {hs.title}
                </div>
              </button>
            );
          })}

          {/* Detail Dossier Modal (When Pin Clicked) */}
          {selectedPhotorealHotspot && (
            <div className="absolute bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-30 bg-[#0a1226]/95 backdrop-blur-xl border border-cyan-500/40 rounded-2xl p-5 shadow-2xl text-left animate-in slide-in-from-bottom-2 duration-200 text-white">
              <div className="flex items-center justify-between gap-2 pb-2 border-b border-blue-900/40">
                <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-cyan-400 uppercase tracking-wider">
                  <Info className="w-3.5 h-3.5 shrink-0 text-cyan-400" />
                  <span>{selectedPhotorealHotspot.tag}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedPhotorealHotspot(null)}
                  className="text-slate-400 hover:text-white text-xs font-mono cursor-pointer px-1.5 py-0.5 rounded bg-slate-800"
                >
                  ✕ Close
                </button>
              </div>

              <h4 className="text-base sm:text-lg font-bold text-white font-poppins mt-2">
                {selectedPhotorealHotspot.title}
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 font-opensans leading-relaxed mt-1">
                {selectedPhotorealHotspot.description}
              </p>

              <div className="mt-3 pt-3 border-t border-blue-900/40 flex items-center justify-between gap-3">
                <div className="font-mono text-xs text-emerald-400 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{selectedPhotorealHotspot.stat}</span>
                </div>
                <button
                  type="button"
                  onClick={() => onOpenDeptDetail(selectedPhotorealHotspot.deptId)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-inter font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-xs"
                >
                  <span>Explore</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TOP STATUS BAR & MODE SWITCHERS */}
      <div className="absolute top-4 left-4 sm:top-5 sm:left-6 right-4 sm:right-6 z-20 pointer-events-none flex flex-wrap items-center justify-between gap-3 max-w-[calc(100vw-2rem)]">
        {/* Status Badge */}
        <div className="flex items-center gap-2 bg-[#090d16]/90 backdrop-blur-md border border-white/10 px-3.5 py-1.5 rounded-full shadow-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] sm:text-[11px] font-roboto font-bold tracking-wider text-white uppercase">
            FLAGSHIP 3D DIGITAL TWIN · NAZE MEGA FORECOURT
          </span>
        </div>

        {/* View Mode Toggle: 3D Orbit vs Photoreal Architectural Twin */}
        <div className="pointer-events-auto flex items-center gap-2">
          <div className="flex items-center gap-1 p-1 bg-[#090d16]/90 backdrop-blur-md border border-white/15 rounded-full shadow-lg">
            <button
              type="button"
              onClick={() => setDisplayMode('3d-model')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-inter font-bold transition-all cursor-pointer ${
                displayMode === '3d-model'
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Box className="w-3.5 h-3.5" />
              <span>3D Orbit Model</span>
            </button>

            <button
              type="button"
              onClick={() => setDisplayMode('photoreal')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-inter font-bold transition-all cursor-pointer ${
                displayMode === 'photoreal'
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Photoreal Twin</span>
            </button>
          </div>

          {/* Lighting Controls (Available in 3D Orbit mode) */}
          {displayMode === '3d-model' && (
            <div className="flex items-center gap-1 p-1 bg-[#090d16]/90 backdrop-blur-md border border-white/15 rounded-full shadow-lg">
              <button
                type="button"
                onClick={() => {
                  const nextTime = timeOfDay === 'sunset' ? 'day' : timeOfDay === 'day' ? 'night' : 'sunset';
                  setTimeOfDay(nextTime);
                  updateEnvironmentLighting(nextTime);
                }}
                className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-roboto font-bold text-slate-200 hover:text-white rounded-full transition-all cursor-pointer capitalize"
                title="Cycle Twilight Dusk / Day / Night"
              >
                {timeOfDay === 'sunset' && <Sunset className="w-3.5 h-3.5 text-amber-400" />}
                {timeOfDay === 'day' && <Sun className="w-3.5 h-3.5 text-yellow-400" />}
                {timeOfDay === 'night' && <Moon className="w-3.5 h-3.5 text-cyan-400" />}
                <span className="hidden sm:inline">{timeOfDay}</span>
              </button>

              <button
                type="button"
                onClick={() => setAutoRotate((prev) => !prev)}
                className={`p-1.5 rounded-full text-xs transition-all cursor-pointer ${
                  autoRotate ? 'text-white bg-red-600 shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
                title={autoRotate ? 'Pause Orbit' : 'Resume Auto Orbit'}
              >
                {autoRotate ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* BOTTOM FLOATING SECTOR DOCK */}
      <div className="absolute bottom-5 left-0 right-0 z-30 pointer-events-none flex flex-col items-center gap-2.5 px-3 w-full max-w-full">
        {displayMode === '3d-model' && (
          <div className="pointer-events-auto flex items-center gap-1 p-1 bg-[#090d16]/90 backdrop-blur-xl border border-white/15 rounded-full shadow-xl max-w-[calc(100vw-2rem)] overflow-x-auto no-scrollbar">
            {[
              { id: 'forecourt', label: 'Fuel Forecourt' },
              { id: 'canopy', label: 'Geometric Canopy' },
              { id: 'store', label: 'Café & Store' },
              { id: 'totem', label: 'Price Totem' },
              { id: 'overview', label: 'Campus Overview' }
            ].map((sec) => (
              <button
                key={sec.id}
                type="button"
                onClick={() => focusCamera(sec.id)}
                className={`px-3 py-1 text-xs font-inter font-semibold rounded-full transition-all cursor-pointer whitespace-nowrap ${
                  activeSector === sec.id
                    ? 'bg-[#1e3a8a] text-white font-bold shadow-xs border border-blue-500'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {sec.label}
              </button>
            ))}
          </div>
        )}

        {/* Scroll Down Button */}
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
          className="pointer-events-auto flex items-center justify-center gap-2 px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full text-xs font-inter font-bold transition-all shadow-lg shadow-red-600/30 hover:scale-105 cursor-pointer active:scale-95 border border-red-500 max-w-[calc(100vw-2rem)]"
        >
          <span className="truncate">Scroll down for station details &amp; live prices</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-white shrink-0" />
        </button>
      </div>

      {/* RAYCASTER HOVER TOOLTIP (3D Mode) */}
      {displayMode === '3d-model' && tooltipData && (
        <div
          style={{
            left: `${tooltipData.x}px`,
            top: `${tooltipData.y}px`
          }}
          className="absolute z-50 pointer-events-none -translate-x-1/2 -translate-y-full mb-3 bg-[#0a1226]/95 backdrop-blur-xl border border-cyan-400/50 rounded-2xl px-4 py-3 shadow-2xl transition-all duration-150 text-left min-w-[240px] max-w-xs text-white"
        >
          <div className="flex items-center gap-1.5 font-roboto text-[10px] font-bold text-cyan-400 uppercase tracking-wider mb-1">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>INTERACTIVE ASSET · CLICK TO OPEN</span>
          </div>
          <div className="text-sm font-bold text-white font-poppins">{tooltipData.title}</div>
          <div className="text-xs text-slate-300 font-opensans leading-snug mt-1">{tooltipData.desc}</div>
          <div className="mt-2 pt-2 border-t border-blue-900/50 text-[11px] font-roboto font-extrabold text-cyan-300">
            {tooltipData.tag}
          </div>
        </div>
      )}
    </div>
  );
};
