import { setTimeout } from "../../SBO/utils/functions";
import cmSettingsData from "../settings";

const C0EPacketClickWindow = Java.type("net.minecraft.network.play.client.C0EPacketClickWindow");
let cwid = -1;

function click(slot, button) {
	if (slot === undefined || button === undefined) return;
	Client.sendPacket(new C0EPacketClickWindow(cwid, slot, button, 0, null, 0));
}

while (cmSettingsData.orbs) {
    setTimeout(() => {
        click(2, 0)
    }, 5000);
}

