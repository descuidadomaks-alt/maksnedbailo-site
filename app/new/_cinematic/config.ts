import initialMedia from "../../../public/careless/media.json";
export const routes = { booking: "https://zcal.co/carelessmaks/ai-map", whatsapp: "https://wa.me/34641935207" };
// Activation requires privacy approval and native widget staging QA. Never enable via query/localStorage.
export const scout = { publicApproved: false, accountId: "625cd09c-4f5a-439a-ad55-379f6e056950", widgetId: "careless-scout-staging", apiUrl: "https://api.mychatbot.app" };
export type Scene = { id: string; label: string; title: string; note: string; image: string; mobileImage?: string; position?: string; mobilePosition?: string; mode?: "image" | "sequence"; frames?: string[] };
export const fallbackScenes: Scene[] = [
 { id: "pool", label: "01 / The surface", title: "A little less on your mind.", note: "An experience that feels effortless.", image: "/careless/images/pool-placeholder.svg" },
 { id: "coast", label: "02 / A different perspective", title: "There is more beneath the surface.", note: "Keep scrolling. Follow the unexpected.", image: "/careless/images/coast-placeholder.svg" },
 { id: "discovery", label: "02A / The discovery", title: "Small details. A whole other world.", note: "The anthill comes into view.", image: "/careless/images/entrance-placeholder.svg" },
 { id: "entrance", label: "02B / The entrance", title: "Let’s take a closer look.", note: "From the outside, you would never know.", image: "/careless/images/entrance-placeholder.svg" },
 { id: "tunnel", label: "03 / Below the surface", title: "Effortless takes a system.", note: "A quiet network of connections.", image: "/careless/images/colony-placeholder.svg" },
 { id: "colony", label: "04 / The colony", title: "Everything working together.", note: "Every connection has a purpose.", image: "/careless/images/colony-placeholder.svg" },
 { id: "scout", label: "05 / Meet Scout", title: "Well, hello.", note: "We don’t get many visitors down here.", image: "/careless/images/colony-placeholder.svg" },
 { id: "hq", label: "06 / Headquarters", title: "Welcome to the thinking behind it.", note: "A better experience, built from the inside out.", image: "/careless/images/hq-placeholder.svg" },
];
// Render the current manifest on the server as well, avoiding a placeholder flash.
export const initialScenes: Scene[] = fallbackScenes.map(scene => {
 const media = initialMedia.scenes.find(s => s.id === scene.id);
 return media ? { ...scene, ...media, mode: "image" } : scene;
});
// Local event contract only: no identifiers, contact data, network transport or CRM calls.
export function track(name: string, detail: Record<string, string> = {}) { window.dispatchEvent(new CustomEvent("careless:event", { detail: { name, ...detail } })); }
