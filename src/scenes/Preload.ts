
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import PreloadText from "../components/PreloadText";
/* START-USER-IMPORTS */
import assetPackUrl from "../../static/assets/asset-pack.json";
/* END-USER-IMPORTS */

export default class Preload extends Phaser.Scene {

	constructor() {
		super("Preload");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// tilesprite_1
		this.add.tileSprite(400, 300, 800, 600, "bg");

		// progress
		const progress = this.add.text(400, 469, "", {});
		progress.setOrigin(0.5, 0.5);
		progress.text = "0%";
		progress.setStyle({ "fontSize": "30px" });

		// logo
		this.add.image(400, 120, "logo");

		// progress (components)
		new PreloadText(progress);

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

	preload() {

		this.editorCreate();

		this.load.pack("asset-pack", assetPackUrl);

		this.load.on(Phaser.Loader.Events.COMPLETE, () => this.scene.start("Level"));
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
