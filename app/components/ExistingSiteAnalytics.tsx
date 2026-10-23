"use client";
import Script from "next/script";
import { usePathname } from "next/navigation";

export default function ExistingSiteAnalytics() {
  // Preserve the site's existing analytics elsewhere. /new has no remote
  // analytics until its public privacy choices and adapter are approved.
  const pathname = usePathname();
  if (pathname === "/new" || pathname === "/new2") return null;
  return <>
    <Script src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "aacf89e5673746c586d5703c252bca88"}' strategy="afterInteractive" />
    <Script id="ms-clarity" strategy="lazyOnload" dangerouslySetInnerHTML={{ __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","wley84eoj3");` }} />
  </>;
}
