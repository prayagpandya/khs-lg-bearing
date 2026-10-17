import React, { useCallback, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { geoEquirectangular, geoPath } from 'd3-geo';
import worldTopology from 'world-atlas/countries-110m.json';
import { feature } from 'topojson-client';
import type { Topology } from 'topojson-specification';
import { StageContext, StageHandle, ThreeStage } from './SceneCanvas';
import { createIndustrialLights } from './sceneUtils';
import { createStudioEnvironment } from './StudioEnvironment';
import { markets } from '../../data/company';
import { latLonToVector3 } from '../../utils/three';
import indiaOfficial from '../../data/india-official.json';

// Radius tuned with camera FOV to guarantee the entire sphere, arcs and beacons
// fit cleanly in the viewport with comfortable margins (NO top or bottom cut-off).
const RADIUS = 1.25;
const HOME = markets.find((m) => m.country === 'India');

// Exact Mumbai coordinates (19.0760° N, 72.8777° E)
const MUMBAI_LAT = HOME?.lat ?? 19.0760;
const MUMBAI_LON = HOME?.lon ?? 72.8777;

// Exact rotation values to place Mumbai at the dead center (0, 0) in 'XYZ' order
const MUMBAI_ROT_Y = ((-MUMBAI_LON - 90) * Math.PI) / 180;
const MUMBAI_ROT_X = (MUMBAI_LAT * Math.PI) / 180;

/**
 * Generates high-definition, realistic industrial slate earth texture.
 * Features official Survey of India sovereign boundaries including all of Jammu, Kashmir & Ladakh.
 */
function createEarthTexture(): THREE.CanvasTexture {
  const width = 2048;
  const height = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get 2d canvas context');

  // Deep industrial oceanic background (charcoal slate gradient)
  const oceanGrad = ctx.createLinearGradient(0, 0, 0, height);
  oceanGrad.addColorStop(0, '#0a1017');
  oceanGrad.addColorStop(0.5, '#0f1722');
  oceanGrad.addColorStop(1, '#0a1017');
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, 0, width, height);

  // Subtle graticule grid lines
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.035)';
  ctx.lineWidth = 1;
  for (let x = 0; x <= width; x += width / 18) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y <= height; y += height / 9) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // D3 equirectangular projection mapped to Three.js UV space
  const projection = geoEquirectangular()
    .translate([width / 2, height / 2])
    .scale(width / (2 * Math.PI));

  const path = geoPath(projection, ctx);
  const worldGeoJson = feature(worldTopology as unknown as Topology, 'countries');

  // Filter out the old 110m India so it is replaced with the official Survey of India map
  const otherCountries = {
    type: 'FeatureCollection',
    features: (worldGeoJson as unknown as { features: GeoJSON.Feature[] }).features.filter(
      (f) => String(f.id) !== '356'
    )
  };

  // 1. Base industrial slate landmasses for all other countries
  ctx.fillStyle = '#1c2836';
  ctx.beginPath();
  path(otherCountries as unknown as GeoJSON.GeoJsonObject);
  ctx.fill();

  // 2. Country borders for other countries - delicate slate separation
  ctx.strokeStyle = 'rgba(100, 116, 139, 0.22)';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  path(otherCountries as unknown as GeoJSON.GeoJsonObject);
  ctx.stroke();

  // 3. Clear Official India Map (Survey of India):
  // Solid landmass fill covers all of India (Jammu, Kashmir, Ladakh, Aksai Chin, etc.)
  // Seamlessly covering and erasing any neighboring border cuts into Indian territory
  ctx.fillStyle = '#1c2836';
  ctx.beginPath();
  path(indiaOfficial as unknown as GeoJSON.GeoJsonObject);
  ctx.fill();

  // 4. Official sovereign international boundary outline of India in warm amber-gold
  ctx.strokeStyle = 'rgba(245, 196, 0, 0.70)';
  ctx.lineWidth = 1.3;
  ctx.beginPath();
  path(indiaOfficial as unknown as GeoJSON.GeoJsonObject);
  ctx.stroke();

  // 5. Coastlines for other countries
  ctx.strokeStyle = 'rgba(245, 196, 0, 0.40)';
  ctx.lineWidth = 1.1;
  ctx.beginPath();
  path(otherCountries as unknown as GeoJSON.GeoJsonObject);
  ctx.stroke();

  // 6. Soft atmospheric continent glow across all lands
  ctx.fillStyle = 'rgba(245, 196, 0, 0.035)';
  ctx.beginPath();
  path(otherCountries as unknown as GeoJSON.GeoJsonObject);
  path(indiaOfficial as unknown as GeoJSON.GeoJsonObject);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

/**
 * Creates precision industrial badge for KHS-LG Mumbai, India source origin.
 */
function createLogoBadgeTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 420;
  canvas.height = 170;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Background rounded industrial plate
  ctx.fillStyle = 'rgba(10, 14, 22, 0.96)';
  ctx.strokeStyle = '#F5C400';
  ctx.lineWidth = 4;
  const r = 16;
  const x = 6, y = 6, w = 408, h = 158;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Accent divider line
  ctx.strokeStyle = 'rgba(245, 196, 0, 0.45)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(25, 96);
  ctx.lineTo(395, 96);
  ctx.stroke();

  // "★ KHS-LG — MUMBAI, INDIA"
  ctx.fillStyle = '#F5C400';
  ctx.font = 'bold 27px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('★ KHS-LG — MUMBAI, INDIA', 210, 54);

  // "GLOBAL SUPPLY HUB • HEAD OFFICE"
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('GLOBAL SUPPLY ORIGIN • HEAD OFFICE', 210, 130);

  const tex = new THREE.CanvasTexture(canvas);
  return tex;
}

export interface GlobeProps {
  className?: string;
  hoveredCountry?: string | null;
  onHoverCountry?: (country: string | null) => void;
}

/**
 * Realistic industrial slate globe:
 * - Default position: Mumbai, India perfectly in the center (0, 0)
 * - Source location accurately set to Mumbai (19.076° N, 72.878° E)
 * - Entire Jammu, Kashmir & Ladakh seamlessly shown as India
 * - Holds center position initially, then smoothly rotates horizontally
 * - 360° movable via mouse/touch drag
 */
export function Globe({ className, hoveredCountry, onHoverCountry }: GlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hoveredRef = useRef<string | null>(hoveredCountry ?? null);
  const onHoverCountryRef = useRef(onHoverCountry);

  // Floating name tag DOM refs for 60fps GPU-accelerated tracking
  const tagRef = useRef<HTMLDivElement>(null);
  const tagTitleRef = useRef<HTMLParagraphElement>(null);
  const tagSubRef = useRef<HTMLParagraphElement>(null);
  const tagIndicatorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    hoveredRef.current = hoveredCountry ?? null;
  }, [hoveredCountry]);

  useEffect(() => {
    onHoverCountryRef.current = onHoverCountry;
  }, [onHoverCountry]);

  const setup = useCallback((ctx: StageContext): StageHandle => {
    if (!HOME) throw new Error('India market data is required for the globe.');

    ctx.camera.lookAt(0, 0, 0);
    ctx.scene.add(createIndustrialLights(false));
    const env = createStudioEnvironment(ctx.renderer);
    ctx.scene.environment = env.texture;

    const seg = ctx.tier === 'low' ? 32 : ctx.tier === 'medium' ? 48 : 64;
    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];

    // Globe sphere center strictly anchored at (0, 0, 0) — never translates or changes position
    const group = new THREE.Group();
    group.rotation.order = 'XYZ';
    group.position.set(0, 0, 0);
    // Initial rotation places Mumbai squarely in the front center (0, 0)
    group.rotation.set(MUMBAI_ROT_X, MUMBAI_ROT_Y, 0);
    ctx.scene.add(group);

    const earthTexture = createEarthTexture();
    const sphereGeo = new THREE.SphereGeometry(RADIUS, seg, seg);
    const sphereMat = new THREE.MeshStandardMaterial({
      map: earthTexture,
      metalness: 0.18,
      roughness: 0.46
    });
    geometries.push(sphereGeo);
    materials.push(sphereMat);
    group.add(new THREE.Mesh(sphereGeo, sphereMat));

    // Mumbai source origin vector
    const origin = latLonToVector3(MUMBAI_LAT, MUMBAI_LON, RADIUS * 1.006);
    const originNorm = origin.clone().normalize();

    // Export Arc Material: warm metallic gold
    const arcMat = new THREE.LineBasicMaterial({
      color: '#F5C400',
      transparent: true,
      opacity: 0.75
    });
    materials.push(arcMat);

    // Destination markers: Natural metallic steel core with subtle gold aura
    const destNodeGeo = new THREE.SphereGeometry(0.024, 12, 12);
    const destNodeMat = new THREE.MeshStandardMaterial({
      color: '#E2E8F0',
      metalness: 0.8,
      roughness: 0.25,
      emissive: '#F5C400',
      emissiveIntensity: 0.3
    });
    const destHaloGeo = new THREE.SphereGeometry(0.046, 12, 12);
    const destHaloMat = new THREE.MeshBasicMaterial({
      color: '#F5C400',
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    geometries.push(destNodeGeo, destHaloGeo);
    materials.push(destNodeMat, destHaloMat);

    // Mumbai source origin hub: High-radiance gold beacon
    const hubNodeGeo = new THREE.SphereGeometry(0.052, 20, 20);
    const hubNodeMat = new THREE.MeshStandardMaterial({
      color: '#F5C400',
      metalness: 0.5,
      roughness: 0.15,
      emissive: '#F5C400',
      emissiveIntensity: 1.2
    });
    const hubHaloGeo = new THREE.SphereGeometry(0.12, 20, 20);
    const hubHaloMat = new THREE.MeshBasicMaterial({
      color: '#F5C400',
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    geometries.push(hubNodeGeo, hubHaloGeo);
    materials.push(hubNodeMat, hubHaloMat);

    // Prominent logo badge hovering over Mumbai
    const badgeTexture = createLogoBadgeTexture();
    const badgeMat = new THREE.SpriteMaterial({
      map: badgeTexture,
      transparent: true,
      depthWrite: false
    });
    materials.push(badgeMat);
    const badgeSprite = new THREE.Sprite(badgeMat);
    badgeSprite.scale.set(0.48, 0.20, 1);
    const badgePos = origin.clone().normalize().multiplyScalar(RADIUS * 1.16);
    badgeSprite.position.copy(badgePos);
    group.add(badgeSprite);

    // Track market meshes for raycasting and dynamic front-facing focus
    const nodeItems: {
      market: (typeof markets)[0];
      node: THREE.Mesh;
      halo: THREE.Mesh;
      isHome: boolean;
    }[] = [];

    markets.forEach((market) => {
      const isHome = market.country === HOME.country;
      const lat = isHome ? MUMBAI_LAT : market.lat;
      const lon = isHome ? MUMBAI_LON : market.lon;
      const pos = latLonToVector3(lat, lon, RADIUS * 1.006);

      const node = new THREE.Mesh(isHome ? hubNodeGeo : destNodeGeo, isHome ? hubNodeMat : destNodeMat);
      node.position.copy(pos);
      node.userData = { country: market.country, isHome, pos };
      group.add(node);

      const halo = new THREE.Mesh(isHome ? hubHaloGeo : destHaloGeo, isHome ? hubHaloMat : destHaloMat);
      halo.position.copy(pos);
      group.add(halo);

      nodeItems.push({ market, node, halo, isHome });

      if (isHome) return;

      // Vaulted great-circle arcs connecting Mumbai to all export destinations
      const posNorm = pos.clone().normalize();
      const dot = THREE.MathUtils.clamp(originNorm.dot(posNorm), -1, 1);
      const angle = Math.acos(dot);
      const segments = 44;
      const points: THREE.Vector3[] = [];

      for (let i = 0; i <= segments; i++) {
        const t = i / segments;
        let v: THREE.Vector3;
        if (angle < 0.001) {
          v = originNorm.clone();
        } else {
          const sinTotal = Math.sin(angle);
          const w1 = Math.sin((1 - t) * angle) / sinTotal;
          const w2 = Math.sin(t * angle) / sinTotal;
          v = originNorm.clone().multiplyScalar(w1).add(posNorm.clone().multiplyScalar(w2)).normalize();
        }
        // Elevation vaulting smoothly without breaching camera frustum
        const arcHeight = Math.sin(t * Math.PI) * (0.12 + 0.24 * (angle / Math.PI));
        const r = RADIUS * 1.006 + arcHeight;
        points.push(v.multiplyScalar(r));
      }

      const arcGeo = new THREE.BufferGeometry().setFromPoints(points);
      geometries.push(arcGeo);
      group.add(new THREE.Line(arcGeo, arcMat));
    });

    // 360-Degree Interactive Drag and Pointer Hover
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const interactiveMeshes = nodeItems.map((item) => item.node);

    let isDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let userHasInteracted = false;
    let dwellTimer = 3.5; // Dwells at Mumbai, India in the center (0, 0) before earth moves

    const domElement = ctx.renderer.domElement;
    domElement.style.cursor = 'grab';

    const handlePointerDown = (e: PointerEvent) => {
      isDragging = true;
      userHasInteracted = true;
      dragStartX = e.clientX;
      dragStartY = e.clientY;
      domElement.style.cursor = 'grabbing';
      try {
        domElement.setPointerCapture(e.pointerId);
      } catch {}
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = domElement.getBoundingClientRect();

      if (isDragging) {
        const dx = e.clientX - dragStartX;
        const dy = e.clientY - dragStartY;
        dragStartX = e.clientX;
        dragStartY = e.clientY;

        // 360-degree free horizontal & vertical rotation
        group.rotation.y += (dx / rect.width) * Math.PI * 2.2;
        group.rotation.x = THREE.MathUtils.clamp(
          group.rotation.x + (dy / rect.height) * Math.PI * 2.0,
          -Math.PI * 0.46,
          Math.PI * 0.46
        );
        return;
      }

      // Pointer hover raycast for node selection
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, ctx.camera);
      const intersects = raycaster.intersectObjects(interactiveMeshes, false);

      if (intersects.length > 0) {
        const hitCountry = intersects[0].object.userData.country;
        hoveredRef.current = hitCountry;
        userHasInteracted = true;
        onHoverCountryRef.current?.(hitCountry);
      }
    };

    const handlePointerUp = (e: PointerEvent) => {
      isDragging = false;
      domElement.style.cursor = 'grab';
      try {
        domElement.releasePointerCapture(e.pointerId);
      } catch {}
    };

    const handlePointerLeave = () => {
      if (!isDragging && !hoveredRef.current) {
        hoveredRef.current = null;
        onHoverCountryRef.current?.(null);
      }
    };

    domElement.addEventListener('pointerdown', handlePointerDown);
    domElement.addEventListener('pointermove', handlePointerMove);
    domElement.addEventListener('pointerup', handlePointerUp);
    domElement.addEventListener('pointercancel', handlePointerUp);
    domElement.addEventListener('pointerleave', handlePointerLeave);

    const tempWorldPos = new THREE.Vector3();

    return {
      update(delta) {
        if (ctx.reduced) return;

        const currentHover = hoveredRef.current;
        const targetMarket = currentHover
          ? markets.find((m) => m.country.toLowerCase() === currentHover.toLowerCase())
          : null;

        if (!isDragging) {
          if (targetMarket) {
            // Target country rotation angles in 'XYZ' order (globe position stays strictly at 0, 0, 0)
            const targetLat = targetMarket.country === 'India' ? MUMBAI_LAT : targetMarket.lat;
            const targetLon = targetMarket.country === 'India' ? MUMBAI_LON : targetMarket.lon;

            const targetRotY = ((-targetLon - 90) * Math.PI) / 180;
            const targetRotX = (targetLat * Math.PI) / 180;

            // Shortest angle rotation along Y axis
            const diffY = targetRotY - group.rotation.y;
            const shortestDiffY = Math.atan2(Math.sin(diffY), Math.cos(diffY));
            group.rotation.y += shortestDiffY * Math.min(delta * 4.8, 1);

            // Smooth tilt on X axis to bring country to front center
            const diffX = targetRotX - group.rotation.x;
            group.rotation.x += diffX * Math.min(delta * 4.8, 1);
          } else {
            // Smoothly ease X tilt back to Mumbai's baseline tilt
            group.rotation.x += (MUMBAI_ROT_X - group.rotation.x) * Math.min(delta * 2.0, 1);

            // Initial dwell where India (Mumbai) stays perfectly in the center (0, 0), then the earth moves
            if (!userHasInteracted && dwellTimer > 0) {
              dwellTimer -= delta;
              group.rotation.y = MUMBAI_ROT_Y;
              group.rotation.x = MUMBAI_ROT_X;
            } else {
              // Smooth, continuous horizontal rotation
              group.rotation.y += delta * 0.24;
            }
          }
        }

        // Fade 3D badge based on whether Mumbai is on the front hemisphere facing camera
        tempWorldPos.copy(origin).applyMatrix4(group.matrixWorld);
        const facing = THREE.MathUtils.clamp((tempWorldPos.z - 0.20) / 0.40, 0, 1);
        badgeMat.opacity = facing;

        // Highlight active node in center & position dynamic floating name tag
        let activeFound = false;
        const activeCountryToTrack = currentHover || (!userHasInteracted && dwellTimer > 0 ? 'India' : null);

        nodeItems.forEach((item) => {
          const isActive = Boolean(
            activeCountryToTrack && item.market.country.toLowerCase() === activeCountryToTrack.toLowerCase()
          );

          if (isActive) {
            item.node.scale.setScalar(1.85);
            item.halo.scale.setScalar(2.25);

            // Compute 3D world position
            item.node.getWorldPosition(tempWorldPos);

            // Point is in front of the camera if world Z > 0.35 (accounting for sphere curvature)
            const isFacingCamera = tempWorldPos.z > 0.35;

            if (isFacingCamera && tagRef.current) {
              activeFound = true;
              const projected = tempWorldPos.clone().project(ctx.camera);
              const w = domElement.clientWidth;
              const h = domElement.clientHeight;
              const screenX = ((projected.x + 1) / 2) * w;
              const screenY = ((-projected.y + 1) / 2) * h;

              tagRef.current.style.display = 'block';
              tagRef.current.style.opacity = '1';
              tagRef.current.style.transform = `translate3d(${screenX}px, ${screenY}px, 0) translate(-50%, -100%) translateY(-14px)`;

              if (tagTitleRef.current) {
                tagTitleRef.current.textContent = item.isHome ? 'KHS-LG — MUMBAI, INDIA' : item.market.country;
              }
              if (tagSubRef.current) {
                tagSubRef.current.textContent = item.isHome
                  ? 'Global Supply Origin • Head Office & Central Hub'
                  : 'KHS-LG Export Destination';
              }
              if (tagIndicatorRef.current) {
                tagIndicatorRef.current.className = `h-2 w-2 rounded-full ${
                  item.isHome ? 'bg-signal animate-ping' : 'bg-signal'
                }`;
              }
            }
          } else {
            item.node.scale.setScalar(1.0);
            item.halo.scale.setScalar(1.0);
          }
        });

        if (!activeFound && tagRef.current) {
          tagRef.current.style.opacity = '0';
          tagRef.current.style.display = 'none';
        }
      },
      dispose() {
        domElement.removeEventListener('pointerdown', handlePointerDown);
        domElement.removeEventListener('pointermove', handlePointerMove);
        domElement.removeEventListener('pointerup', handlePointerUp);
        domElement.removeEventListener('pointercancel', handlePointerUp);
        domElement.removeEventListener('pointerleave', handlePointerLeave);
        env.dispose();
        earthTexture.dispose();
        badgeTexture.dispose();
        geometries.forEach((g) => g.dispose());
        materials.forEach((m) => m.dispose());
        ctx.scene.environment = null;
      }
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative select-none overflow-visible touch-none ${className || ''}`}>
      <ThreeStage
        className="h-full w-full"
        cameraPosition={[0, 0, 4.5]}
        fov={42}
        shadows={false}
        setup={setup}
        fallbackLabel="KHS-LG global export markets"
      />

      {/* Floating Dynamic Name Tag anchored directly to the focused country in the center */}
      <div
        ref={tagRef}
        className="pointer-events-none absolute left-0 top-0 z-30 transition-opacity duration-200 opacity-0 hidden"
        style={{ willChange: 'transform, opacity' }}
      >
        <div className="relative rounded-md border border-signal bg-ink-950/95 px-3.5 py-2 shadow-[0_4px_24px_rgba(245,196,0,0.4)] backdrop-blur-md">
          {/* Connecting downward pointer triangle */}
          <div className="absolute -bottom-1.5 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rotate-45 border-b border-r border-signal bg-ink-950" />

          <div className="flex items-center gap-2">
            <span ref={tagIndicatorRef} className="h-2 w-2 rounded-full bg-signal" />
            <p ref={tagTitleRef} className="font-mono text-xs font-bold uppercase tracking-wider text-signal">
              KHS-LG — MUMBAI, INDIA
            </p>
          </div>
          <p ref={tagSubRef} className="mt-0.5 font-mono text-[9px] uppercase tracking-wider text-steel-300">
            Global Supply Origin • Head Office & Central Hub
          </p>
        </div>
      </div>
    </div>
  );
}