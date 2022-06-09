
// You can write more code here

/* START OF COMPILED CODE */

import UserComponent from "./UserComponent";
import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class PushOnClick extends UserComponent {

	constructor(gameObject: Phaser.GameObjects.Image, private onClick: (id:string)=>void) {
		super(gameObject);

		this.gameObject = gameObject;
		(gameObject as any)["__PushOnClick"] = this;

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	static getComponent(gameObject: Phaser.GameObjects.Image): PushOnClick {
		return (gameObject as any)["__PushOnClick"];
	}

	private gameObject: Phaser.GameObjects.Image;

	/* START-USER-CODE */

	awake() {

		this.gameObject.setInteractive().on("pointerdown", () => {
			this.onClick(this.gameObject.texture.key);

			this.scene.add.tween({
				targets: this.gameObject,
				scaleX: .8,//"*=0.8",
				scaleY: .8,//"*=0.8",
				duration: 80,
				yoyo: true,
			});
		});
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
