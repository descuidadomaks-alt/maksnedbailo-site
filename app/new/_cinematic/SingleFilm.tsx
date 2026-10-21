"use client";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { controlFilm } from "./filmController";
import type { Film } from "./cinema";
import styles from "./careless.module.css";

export type FilmHandle = { seek(progress: number): void; retry(): void };
export const SingleFilm = forwardRef<FilmHandle, { film: Film; onPresented(time: number): void; onWaiting(): void; onFailure(): void }>(function SingleFilm({ film, onPresented, onWaiting, onFailure }, ref) {
  const element = useRef<HTMLVideoElement>(null);
  const controller = useRef<ReturnType<typeof controlFilm>>();
  const target = useRef(0);
  const callbacks = useRef({ onPresented, onWaiting, onFailure });
  callbacks.current = { onPresented, onWaiting, onFailure };
  const [visible, setVisible] = useState(false);
  useImperativeHandle(ref, () => ({
    seek(progress) { if (progress === 0 && target.current > 0) setVisible(false); target.current = progress; controller.current?.seek(progress); },
    retry() { setVisible(false); controller.current?.retry(); }
  }), []);
  useEffect(() => {
    const video = element.current!;
    setVisible(false);
    // Select once per mount. Resizing does not restart or download a second film.
    const src = matchMedia("(max-width: 700px)").matches && film.mobileSrc ? film.mobileSrc : film.src;
    video.src = src;
    const control = controlFilm(video, film.duration, film.fps, {
      presented(time) { setVisible(true); callbacks.current.onPresented(time); },
      waiting() { if (target.current === 0) setVisible(false); callbacks.current.onWaiting(); },
      failed() { setVisible(false); callbacks.current.onFailure(); }
    });
    controller.current = control; control.seek(target.current); video.load();
    return () => { control.dispose(); controller.current = undefined; video.removeAttribute("src"); video.load(); };
  }, [film.src, film.mobileSrc, film.duration, film.fps]);
  return <video ref={element} className={styles.scrubVideo} data-single-film="true" muted playsInline preload="auto" disablePictureInPicture aria-hidden="true" style={{ opacity: visible ? 1 : 0, transition: "none" }} />;
});
