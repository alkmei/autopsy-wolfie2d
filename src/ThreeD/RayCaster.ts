import Vec2 from "@/Wolfie2D/DataTypes/Vec2";
import Tilemap from "@/Wolfie2D/Nodes/Tilemap";

const TILE_SIZE = 32;

export default class RayCaster {
  static castHorizontal(gameMap: Tilemap, position: Vec2, angle: number) {
    const up = Math.abs(Math.floor(angle / Math.PI) % 2);

    const firstY = up
      ? Math.floor(position.y / TILE_SIZE) * TILE_SIZE
      : Math.floor(position.y / TILE_SIZE) * TILE_SIZE + TILE_SIZE;

    const firstX = position.x + (firstY - position.y) / Math.tan(angle);

    const dy = up ? -TILE_SIZE : TILE_SIZE;
    const dx = dy / Math.tan(angle);

    let currentX = firstX;
    let currentY = firstY;

    while (
      gameMap.getTileAtWorldPosition(
        new Vec2(currentX, up ? currentY - TILE_SIZE : currentY),
      ) == 0
    ) {
      currentX += dx;
      currentY += dy;
    }

    return {
      distance: Math.sqrt(
        Math.pow(currentX - position.x, 2) + Math.pow(currentY - position.y, 2),
      ),
      angle: angle,
      vertical: false,
    };
  }

  static castVertical(gameMap: Tilemap, position: Vec2, angle: number) {
    const right = Math.abs(Math.floor((angle - Math.PI / 2) / Math.PI) % 2);

    const firstX = right
      ? Math.floor(position.x / TILE_SIZE) * TILE_SIZE + TILE_SIZE
      : Math.floor(position.x / TILE_SIZE) * TILE_SIZE;
    const firstY = position.y + (firstX - position.x) * Math.tan(angle);

    const dx = right ? TILE_SIZE : -TILE_SIZE;
    const dy = dx * Math.tan(angle);

    let currentX = firstX;
    let currentY = firstY;

    while (
      gameMap.getTileAtWorldPosition(
        new Vec2(Math.floor(right ? currentX : currentX - TILE_SIZE), currentY),
      ) == 0
    ) {
      currentX += dx;
      currentY += dy;
    }

    return {
      distance: Math.sqrt(
        Math.pow(currentX - position.x, 2) + Math.pow(currentY - position.y, 2),
      ),
      angle: angle,
      vertical: true,
    };
  }

  static cast(gameMap: Tilemap, position: Vec2, angle: number) {
    const h = this.castHorizontal(gameMap, position, angle);
    const v = this.castVertical(gameMap, position, angle);
    return h.distance < v.distance ? h : v;
  }

  static simpleCast(gameMap: Tilemap, position: Vec2, angle: number) {
    const ray = this.cast(gameMap, position, angle);
    return {
      x: ray.distance * Math.cos(ray.angle),
      y: ray.distance * Math.sin(ray.angle),
    };
  }
}
