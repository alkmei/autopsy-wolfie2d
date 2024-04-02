import Scene from "../../Wolfie2D/Scene/Scene";
import Button from "../../Wolfie2D/Nodes/UIElements/Button";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Color from "../../Wolfie2D/Utils/Color";

enum Layers {
  Main = "main",
}

export default class MainMenu extends Scene {
  startScene() {
    this.addUILayer(Layers.Main);
    // Center the viewport
    let size = this.viewport.getHalfSize();
    this.viewport.setFocus(size);

    this.viewport.setZoomLevel(1);

    // Create a play button
    let playBtn = <Button>this.add.uiElement(
      UIElementType.BUTTON,
      Layers.Main,
      {
        position: new Vec2(size.x, size.y),
        text: "Play Game",
      },
    );
    playBtn.backgroundColor = Color.TRANSPARENT;
    playBtn.borderColor = Color.WHITE;
    playBtn.borderRadius = 0;
    playBtn.setPadding(new Vec2(50, 10));
  }
}
