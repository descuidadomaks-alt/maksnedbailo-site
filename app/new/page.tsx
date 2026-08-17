/**
 * /new — experimental homepage, V2 positioning.
 *
 * Renders app/new/_v2/V2HomeClient.tsx. Used to permanently redirect to "/"
 * (the live homepage lives at app/page.tsx and imports its own components
 * from app/new/** directly — it does not depend on this file). This route
 * segment is used only by /new; see app/new/layout.tsx for confirmation
 * that nothing else imports it.
 */
import V2HomeClient from "./_v2/V2HomeClient";

export default function NewPage() {
  return <V2HomeClient />;
}
