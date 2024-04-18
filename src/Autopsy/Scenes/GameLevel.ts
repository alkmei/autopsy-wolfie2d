import Scene from "../../Wolfie2D/Scene/Scene";
import Player, { ActionState, PlayerAnimations } from "../Player/Player";
import { GraphicType } from "../../Wolfie2D/Nodes/Graphics/GraphicTypes";
import Camera from "../Camera";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Color from "../../Wolfie2D/Utils/Color";
import { Events, PhysicsGroups } from "../../globals";
import GameEvent from "../../Wolfie2D/Events/GameEvent";
import Label from "../../Wolfie2D/Nodes/UIElements/Label";
import Button from "../../Wolfie2D/Nodes/UIElements/Button";
import MainMenu from "./MainMenu";
import Input from "../../Wolfie2D/Input/Input";
import { Action } from "../../globals";
import PlayerState from "../Player/States/PlayerState";
import Ghost, { GhostType } from "../Enemy/Ghost/Ghost";
import Viewport from "../../Wolfie2D/SceneGraph/Viewport";
import SceneManager from "../../Wolfie2D/Scene/SceneManager";
import RenderingManager from "../../Wolfie2D/Rendering/RenderingManager";
import Rect from "../../Wolfie2D/Nodes/Graphics/Rect";

export enum Layers {
  Main = "main",
  UI = "ui",
  Background = "bg",
  Hidden = "hidden",
  Debug = "debg",
  Pause = "pause",
  DeathMenu = "death",
}

export default class GameLevel extends Scene {
  player: Player;
  camera: Camera;

  // TODO: Make Enemy.ts and ghost inherit from that
  enemies: Array<Ghost>;

  playerStateLabel: Label;
  playerActionStateLabel: Label;

  nextLevel: new (...args: any) => GameLevel;
  levelEndArea: Rect;

  healthBar: Label;
  healthBarBg: Label;

  textColor = new Color(231, 224, 241);
  healthBarColor = new Color(215, 74, 91);

  public constructor(
    viewport: Viewport,
    sceneManager: SceneManager,
    renderingManager: RenderingManager,
    options: Record<string, any>,
  ) {
    super(viewport, sceneManager, renderingManager, options);

    // TODO: change to type enemy when implemented
    this.enemies = new Array<Ghost>();
  }

  loadScene() {
    // reaper and animations
    this.load.spritesheet("reaper", "assets/spritesheets/Reaper/reaper.json");
    this.load.spritesheet(
      "ScytheSlash",
      "assets/spritesheets/Reaper/ReaperVFX/ScytheSlash.json",
    );
    this.load.spritesheet(
      "ScytheUpper",
      "assets/spritesheets/Reaper/ReaperVFX/ScytheUpper.json",
    );
    this.load.spritesheet(
      "ScytheDown",
      "assets/spritesheets/Reaper/ReaperVFX/ScytheDown.json",
    );
    this.load.audio("dash", "assets/sounds/dash.wav");

    // red soul enemy
    this.load.spritesheet(
      "RedSoul",
      "assets/spritesheets/RedSoul/RedSoul.json",
    );

    this.addLayer(Layers.Main, 1);
    this.addUILayer(Layers.UI);
    this.addUILayer(Layers.Pause).setHidden(true);
    this.addUILayer(Layers.DeathMenu).setHidden(true);
    this.addLayer(Layers.Debug, 2);
    this.addLayer(Layers.Hidden, 1).setHidden(true);
  }

  unloadScene(): void {
    this.resourceManager.keepSpritesheet("reaper");
  }

  startScene() {
    this.player = new Player(this.add.animatedSprite("reaper", Layers.Main));
    this.camera = new Camera(
      this.add.graphic(GraphicType.POINT, Layers.Hidden, {
        position: this.player.node.position.clone(),
      }),
      new Vec2(0, -80),
    );

    this.camera.follow(this.player.node);

    this.playerStateLabel = <Label>this.add.uiElement(
      UIElementType.LABEL,
      Layers.Debug,
      {
        position: this.player.node.position.clone(),
        text: "",
      },
    );
    this.playerStateLabel.font = "Mister Pixel";
    this.playerStateLabel.textColor = Color.WHITE;

    this.playerActionStateLabel = <Label>this.add.uiElement(
      UIElementType.LABEL,
      Layers.Debug,
      {
        position: this.player.node.position.clone(),
        text: "",
      },
    );
    this.playerActionStateLabel.font = "Mister Pixel";
    this.playerActionStateLabel.textColor = Color.WHITE;

    this.viewport.follow(this.camera.node);
    this.viewport.setZoomLevel(2);
    this.viewport.setSmoothingFactor(0);

    this.initPauseLayer();
    this.initDeathLayer();
    this.initUI();

    // subscribe to events
    this.receiver.subscribe(Events.MAIN_MENU);
    this.receiver.subscribe(Events.ENEMY_DAMAGE);
    this.receiver.subscribe(Events.PLAYER_DAMAGE);
    this.receiver.subscribe(Events.ENEMY_DEATH);
    this.receiver.subscribe(Events.PLAYER_DEATH);
    this.receiver.subscribe(Events.PLAYER_HEAL);

    this.receiver.subscribe(Events.LEVEL_END);
    this.receiver.subscribe(Events.ENTER_LEVEL_END);
  }

  update(deltaT: number) {
    if (Input.isJustPressed(Action.Pause)) {
      Input.disableInput();
      this.uiLayers.get(Layers.Pause).setHidden(false);
    }

    this.camera.update(deltaT);
    this.player.update(deltaT);

    super.update(deltaT);

    this.playerStateLabel.text = (<PlayerState>(
      this.player.movementStateMachine.getState()
    )).stateName;
    this.playerStateLabel.position = this.player.node.position
      .clone()
      .add(new Vec2(0, -40));

    this.playerActionStateLabel.text = (<PlayerState>(
      this.player.actionStateMachine.getState()
    )).stateName;
    this.playerActionStateLabel.position = this.player.node.position
      .clone()
      .add(new Vec2(0, -80));
    // handle events
    while (this.receiver.hasNextEvent()) {
      this.handleEvent(this.receiver.getNextEvent());
    }
  }

  handleEvent(event: GameEvent) {
    switch (event.type) {
      case Events.MAIN_MENU: {
        this.sceneManager.changeToScene(MainMenu);

        break;
      }

      case Events.ENEMY_DAMAGE: {
        let enemy = event.data.get("enemy");
        enemy.health -= 1;
        console.log(`Enemy: ${enemy.health}`);

        if (enemy.health <= 0)
          this.emitter.fireEvent(Events.ENEMY_DEATH, { enemy: enemy });

        break;
      }

      case Events.PLAYER_DAMAGE: {
        if (this.player.health > 0) {
          this.player.node.animation.play(PlayerAnimations.TakeDamage);
          this.player.health -= 1;
          this.healthBar.size.x = 600 * (this.player.health / 10);
          this.healthBar.position.x = 0;
          if (this.player.health <= 0)
            this.emitter.fireEvent(Events.PLAYER_DEATH);

          console.log(`Player: ${this.player.health}`);
        }
        break;
      }

      case Events.PLAYER_HEAL: {
        if (this.player.health + 1 <= this.player.maxHealth) {
          this.player.health += 1;
          this.healthBar.size.x = 600 * (this.player.health / 10);
          this.healthBar.position.x = 0;
          console.log(`Player: ${this.player.health}`);
        }
        break;
      }

      // TODO: Death animations
      case Events.ENEMY_DEATH: {
        let enemy = event.data.get("enemy");

        // Heal player if red soul
        if (enemy.type === GhostType.RED)
          this.emitter.fireEvent(Events.PLAYER_HEAL);

        enemy.node.destroy();
        this.enemies = this.enemies.filter(e => e !== enemy);

        break;
      }

      case Events.PLAYER_DEATH: {
        Input.disableInput();
        this.player.actionStateMachine.changeState(ActionState.Dead);
        this.uiLayers.get(Layers.DeathMenu).setHidden(false);

        break;
      }

      case Events.LEVEL_END: {
        /*
          Rows in the collisions array represent each physics group by index, 
          first index of the first row is the first phys group itself,
          second index in the second row is the second phys group itself, etc.

          0 is does not collide, 1 is collide
        */
        let sceneOptions = {
          physics: {
            groupNames: [
              PhysicsGroups.PLAYER_PHYS,
              PhysicsGroups.ENEMY_PHYS,
              PhysicsGroups.HITBOX_PHYS,
            ],
            collisions: [
              [0, 1, 1],
              [0, 1, 1],
              [0, 0, 0],
            ],
          },
        };
        this.sceneManager.changeToScene(this.nextLevel, {}, sceneOptions);

        break;
      }

      case Events.ENTER_LEVEL_END: {
        if (this.enemies.length === 0) this.emitter.fireEvent(Events.LEVEL_END);

        break;
      }
    }
  }

  initUI() {
    this.healthBar = <Label>this.add.uiElement(UIElementType.LABEL, Layers.UI, {
      position: new Vec2(0, 30),
      text: "",
    });
    this.healthBar.size = new Vec2(600, 50);
    this.healthBar.backgroundColor = this.healthBarColor;
    this.healthBar.borderWidth = 2;
    this.healthBar.borderRadius = 0;

    const healthBarBorder = <Label>this.add.uiElement(
      UIElementType.LABEL,
      Layers.UI,
      {
        position: new Vec2(70, 30),
        text: "",
      },
    );
    healthBarBorder.size = new Vec2(320, 50);
    healthBarBorder.borderColor = Color.WHITE;
    healthBarBorder.borderWidth = 2;
    healthBarBorder.borderRadius = 0;
  }

  initPauseLayer() {
    const buttonWidth: number = 450;
    const buttonHeight: number = 65;

    const resumeButton = this.newButton(
      new Vec2(100, 70),
      "RESUME",
      52,
      Layers.Pause,
    );

    resumeButton.size.x = buttonWidth;
    resumeButton.size.y = buttonHeight;
    resumeButton.onClick = () => {
      Input.enableInput();
      this.uiLayers.get(Layers.Pause).setHidden(true);
    };

    const menuButton = this.newButton(
      new Vec2(100, 70 + 38),
      "MENU",
      52,
      Layers.Pause,
    );
    menuButton.onClick = () => {
      Input.enableInput();
    };
    menuButton.onClickEventId = Events.MAIN_MENU;
    menuButton.size.x = buttonWidth;
    menuButton.size.y = buttonHeight;
  }

  initDeathLayer() {
    const buttonWidth: number = 500;
    const buttonHeight: number = 80;

    const menuButton = this.newButton(
      new Vec2(300, 200),
      "RETURN TO MENU",
      52,
      Layers.DeathMenu,
    );
    menuButton.onClick = () => {
      Input.enableInput();
    };
    menuButton.onClickEventId = Events.MAIN_MENU;
    menuButton.size.x = buttonWidth;
    menuButton.size.y = buttonHeight;
  }

  protected handleHealthChange(currentHealth: number, maxHealth: number): void {
    console.log(currentHealth);
    let unit = this.healthBarBg.size.x / maxHealth;

    this.healthBar.size.set(
      this.healthBarBg.size.x - unit * (maxHealth - currentHealth),
      this.healthBarBg.size.y,
    );
    this.healthBar.position.set(
      this.healthBarBg.position.x -
        (unit / 2 / this.getViewScale()) * (maxHealth - currentHealth),
      this.healthBarBg.position.y,
    );
  }

  addLevelEnd(startingTile: Vec2, size: Vec2): void {
    this.levelEndArea = <Rect>this.add.graphic(GraphicType.RECT, Layers.Main, {
      position: startingTile,
      size: size,
    });
    this.levelEndArea.addPhysics(undefined, undefined, false, true);
    this.levelEndArea.setTrigger(
      PhysicsGroups.PLAYER_PHYS,
      Events.ENTER_LEVEL_END,
      null,
    );
    this.levelEndArea.color = new Color(255, 255, 255, 1);
  }

  private newButton(
    position: Vec2,
    text: string,
    fontSize: number,
    layer: Layers,
  ): Button {
    const button = <Button>this.add.uiElement(UIElementType.BUTTON, layer, {
      position: position,
      text: text,
    });
    button.borderColor = Color.WHITE;
    button.borderWidth = 2;
    button.borderRadius = 0;
    button.setPadding(new Vec2(50, 10));
    button.font = "MEGAPIX";
    button.fontSize = fontSize;
    button.textColor = this.textColor;
    button.backgroundColor = new Color(16, 14, 18, 1);

    button.scale.set(
      1 / this.viewport.getZoomLevel(),
      1 / this.viewport.getZoomLevel(),
    );

    return button;
  }
}
