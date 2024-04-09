import type { Vector2 } from "./Cursor";

export interface GrassCube {
    position: Vector2;
    size: number;
    
    collectGrass(): void;
}

export interface GrassField {
    growSpeed(): number;
    grassCap(): number;
    cutterLength(): number;

    spawnGrass(canvas: HTMLCanvasElement): GrassCube;
}
