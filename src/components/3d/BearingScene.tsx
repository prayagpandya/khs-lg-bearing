import { MutableRefObject, useCallback, useRef } from 'react';
import * as THREE from 'three';
import { StageContext, StageHandle, ThreeStage } from './SceneCanvas';
import { createIndustrialLights } from './sceneUtils';
import { RollerShape, createBearing } from './BearingModel';
import { createStudioEnvironment } from './StudioEnvironment';
import { createEngineeringGrid } from './EngineeringGrid';
import { createFloatingParticles } from './FloatingParticles';
import { createTechRings } from './TechRings';
import { createCameraRig } from './CameraRig';
import { NumSource, readNum } from '../../utils/three';

export interface BearingSceneProps {
  className?: string;
  explode?: NumSource;
  scan?: NumSource;
  spin?: NumSource;
  rings?: NumSource;
  cameraZ?: NumSource;
  cameraY?: NumSource;
  pointer?: MutableRefObject<{x: number;y: number;}>;
  rollerShape?: RollerShape;
  grid?: boolean;
  particles?: boolean;
  scale?: NumSource;
  modelX?: NumSource;
  modelY?: NumSource;
  fov?: number;
  /** Starting camera position — used to continue the loader's push-in shot. */
  initialCamera?: [number, number, number];
  /** Camera damping — higher follows the target faster. */
  cameraLambda?: number;
  fallbackLabel?: string;
}

/** The site-wide bearing stage. Every section reuses this same visual language. */
export function BearingScene({
  className,
  explode,
  scan,
  spin = 0.32,
  rings,
  cameraZ = 4.8,
  cameraY = 1.1,
  pointer,
  rollerShape = 'ball',
  grid = true,
  particles = true,
  scale = 1,
  modelX = 0,
  modelY = 0,
  fov = 38,
  initialCamera = [0, 1.1, 4.8],
  cameraLambda = 2.4,
  fallbackLabel
}: BearingSceneProps) {
  const props = useRef({ explode, scan, spin, rings, cameraZ, cameraY, modelX, modelY, scale, pointer, cameraLambda });
  props.current = { explode, scan, spin, rings, cameraZ, cameraY, modelX, modelY, scale, pointer, cameraLambda };

  const setup = useCallback(
    (ctx: StageContext): StageHandle => {
      ctx.scene.add(createIndustrialLights(ctx.shadows));

      const env = createStudioEnvironment(ctx.renderer);
      ctx.scene.environment = env.texture;

      const initScale = readNum(props.current.scale, 1);
      const bearing = createBearing({
        quality: ctx.tier,
        rollerShape,
        scale: initScale,
        castShadow: ctx.shadows
      });
      bearing.group.position.x = readNum(props.current.modelX, 0);
      bearing.group.position.y = readNum(props.current.modelY, 0);
      ctx.scene.add(bearing.group);

      const techRings = createTechRings(ctx.tier);
      ctx.scene.add(techRings.group);

      const engGrid = grid ? createEngineeringGrid({ receiveShadow: ctx.shadows }) : null;
      if (engGrid) ctx.scene.add(engGrid.group);

      const particleCount = ctx.tier === 'low' ? 0 : ctx.tier === 'medium' ? 90 : 220;
      const field =
      particles && particleCount > 0 ?
      createFloatingParticles({ count: particleCount, paused: ctx.reduced }) :
      null;
      if (field) ctx.scene.add(field.points);

      const rig = createCameraRig(ctx.camera);

      return {
        update(delta, elapsed) {
          engGrid?.updateTheme();
          const p = props.current;
          bearing.group.position.x = readNum(p.modelX, 0);
          bearing.group.position.y = readNum(p.modelY, 0);
          const sc = readNum(p.scale, 1);
          bearing.group.scale.set(sc, sc, sc);

          bearing.update(
            {
              explode: readNum(p.explode, 0),
              scan: readNum(p.scan, 0),
              spin: readNum(p.spin, 0.32),
              pointer: p.pointer?.current,
              reduced: ctx.reduced
            },
            delta
          );
          techRings.update(readNum(p.rings, 0), delta);
          field?.update(delta, elapsed);
          rig.update(
            {
              z: readNum(p.cameraZ, 4.8),
              y: readNum(p.cameraY, 1.1),
              pointer: undefined,
              parallax: 0,
              lambda: p.cameraLambda
            },
            delta
          );
        },
        dispose() {
          engGrid?.dispose();
          env.dispose();
          bearing.dispose();
          techRings.dispose();
          field?.dispose();
          ctx.scene.environment = null;
        }
      };
    },
    [rollerShape, grid, particles]
  );

  return (
    <ThreeStage
      className={className}
      cameraPosition={initialCamera}
      fov={fov}
      setup={setup}
      fallbackLabel={fallbackLabel} />);


}