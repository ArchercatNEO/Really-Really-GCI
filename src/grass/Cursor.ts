import type { GrassCube } from "./GrassField";

export class Vector2 {
    constructor(
        public x: number,
        public y: number
    ) {}
}

export class Cursor {
    active: boolean = false;
    position: Vector2 = new Vector2(0, 0);

    isColliding(cursorSize: number, collider: GrassCube): boolean {
        if (this.position.x + cursorSize / 2 < collider.position.x - collider.size / 2) { return false; }
        if (this.position.x - cursorSize / 2 > collider.position.x + collider.size / 2) { return false; }
        if (this.position.y + cursorSize / 2 < collider.position.y - collider.size / 2) { return false; }
        if (this.position.y - cursorSize / 2 > collider.position.y + collider.size / 2) { return false; }
        return true;
    }
}