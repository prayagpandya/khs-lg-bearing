import * as THREE from 'three';

export interface EngineeringGridHandle {
  group: THREE.Group;
  updateTheme: () => void;
  dispose: () => void;
}

/**
 * Faint industrial floor grid:
 * - In dark mode: dark metallic plate and muted charcoal grid
 * - In light mode: completely transparent ShadowMaterial with subtle blueprint grid,
 *   preventing any dark floor disc from obscuring the hero text or background.
 */
export function createEngineeringGrid({
  size = 34,
  divisions = 34,
  y = -1.85,
  opacity = 0.22,
  receiveShadow = false
}: {
  size?: number;
  divisions?: number;
  y?: number;
  opacity?: number;
  receiveShadow?: boolean;
} = {}): EngineeringGridHandle {
  const group = new THREE.Group();
  group.position.y = y;

  // Dark mode grid
  const darkGrid = new THREE.GridHelper(size, divisions, '#3a3a3a', '#1e1e1e');
  const darkGridMat = darkGrid.material as THREE.Material;
  darkGridMat.transparent = true;
  darkGridMat.opacity = opacity;
  darkGridMat.depthWrite = false;
  group.add(darkGrid);

  // Dark mode opaque metallic floor
  const darkFloorGeo = new THREE.CircleGeometry(size / 2, 64);
  const darkFloorMat = new THREE.MeshStandardMaterial({
    color: '#080808',
    metalness: 0.6,
    roughness: 0.55
  });
  const darkFloor = new THREE.Mesh(darkFloorGeo, darkFloorMat);
  darkFloor.rotation.x = -Math.PI / 2;
  darkFloor.position.y = -0.01;
  darkFloor.receiveShadow = receiveShadow;
  group.add(darkFloor);

  // Light mode subtle blueprint grid
  const lightGrid = new THREE.GridHelper(size, divisions, '#cbd5e1', '#e2e8f0');
  const lightGridMat = lightGrid.material as THREE.Material;
  lightGridMat.transparent = true;
  lightGridMat.opacity = 0.35;
  lightGridMat.depthWrite = false;
  group.add(lightGrid);

  // Light mode shadow receiver floor (100% transparent except for soft cast shadow)
  const lightFloorGeo = new THREE.CircleGeometry(size / 2, 64);
  const lightFloorMat = new THREE.ShadowMaterial({ opacity: 0.08 });
  const lightFloor = new THREE.Mesh(lightFloorGeo, lightFloorMat);
  lightFloor.rotation.x = -Math.PI / 2;
  lightFloor.position.y = -0.01;
  lightFloor.receiveShadow = true;
  group.add(lightFloor);

  let lastTheme: string | null = null;

  const applyTheme = () => {
    const isLight =
      typeof document !== 'undefined' &&
      document.documentElement.classList.contains('theme-light');
    const currentTheme = isLight ? 'light' : 'dark';
    if (currentTheme === lastTheme) return;
    lastTheme = currentTheme;

    darkGrid.visible = !isLight;
    darkFloor.visible = !isLight;
    lightGrid.visible = isLight;
    lightFloor.visible = isLight;
  };

  applyTheme();

  return {
    group,
    updateTheme: applyTheme,
    dispose() {
      darkGrid.geometry.dispose();
      darkGridMat.dispose();
      darkFloorGeo.dispose();
      darkFloorMat.dispose();
      lightGrid.geometry.dispose();
      lightGridMat.dispose();
      lightFloorGeo.dispose();
      lightFloorMat.dispose();
    }
  };
}