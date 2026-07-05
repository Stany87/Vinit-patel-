import { gsap } from "gsap";

export interface CameraRefs {
  introOverlay: HTMLDivElement | null;
  cameraRig: HTMLDivElement | null;
  cameraAssembly: SVGGElement | null;
  focusRing: SVGCircleElement | null;
  irisGroup: SVGGElement | null;
  caption: HTMLDivElement | null;
  dustField: HTMLDivElement | null;
  afBrackets: SVGGElement | null;
}

const LENS_LOCAL_X = 0;
const LENS_LOCAL_Y = 0;
const SVG_ORIGIN = `${LENS_LOCAL_X} ${LENS_LOCAL_Y}`;
const IRIS_R = 54;
const REST_OPENNESS = 0.68;

function setIris(irisRingEl: SVGPathElement, openness: number) {
  const innerR = openness * IRIS_R;
  const R = IRIS_R;
  if (innerR < 0.5) {
    irisRingEl.setAttribute(
      "d",
      `M ${R},0 A ${R},${R} 0 1,0 -${R},0 A ${R},${R} 0 1,0 ${R},0 Z`,
    );
  } else {
    const r = innerR.toFixed(2);
    irisRingEl.setAttribute(
      "d",
      `M ${R},0 A ${R},${R} 0 1,0 -${R},0 A ${R},${R} 0 1,0 ${R},0 Z ` +
        `M ${r},0 A ${r},${r} 0 1,1 -${r},0 A ${r},${r} 0 1,1 ${r},0 Z`,
    );
  }
}

function buildIrisGroup(irisGroup: SVGGElement): SVGPathElement {
  irisGroup.innerHTML = "";

  const irisRingEl = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path",
  );
  irisRingEl.setAttribute("fill", "#141416");
  irisRingEl.setAttribute("fill-rule", "evenodd");
  irisGroup.appendChild(irisRingEl);

  const detailRadii = [10, 18, 26, 34, 42, 50];
  detailRadii.forEach((r, dr) => {
    const ring = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle",
    );
    ring.setAttribute("r", r.toString());
    ring.setAttribute("fill", "none");
    ring.setAttribute("stroke", dr % 2 === 0 ? "#222225" : "#1a1a1d");
    ring.setAttribute("stroke-width", "0.6");
    ring.setAttribute("opacity", "0.5");
    irisGroup.appendChild(ring);
  });

  const N_LINES = 9;
  for (let li = 0; li < N_LINES; li++) {
    const ang = (li * (360 / N_LINES) * Math.PI) / 180;
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", (4 * Math.cos(ang)).toFixed(2));
    line.setAttribute("y1", (4 * Math.sin(ang)).toFixed(2));
    line.setAttribute("x2", (IRIS_R * Math.cos(ang)).toFixed(2));
    line.setAttribute("y2", (IRIS_R * Math.sin(ang)).toFixed(2));
    line.setAttribute("stroke", "#1c1c1f");
    line.setAttribute("stroke-width", "0.35");
    line.setAttribute("opacity", "0.35");
    irisGroup.appendChild(line);
  }

  return irisRingEl;
}

function buildDustParticles(dustField: HTMLDivElement): gsap.core.Tween[] {
  dustField.innerHTML = "";
  const dustCount = window.innerWidth < 700 ? 14 : 26;
  const dustTweens: gsap.core.Tween[] = [];

  for (let d = 0; d < dustCount; d++) {
    const sp = document.createElement("span");
    sp.className = "dust";
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const dur = 8 + Math.random() * 10;
    const delay = Math.random() * -10;
    const size = 1 + Math.random() * 2;
    sp.style.left = `${left}%`;
    sp.style.top = `${top}%`;
    sp.style.width = `${size}px`;
    sp.style.height = `${size}px`;
    sp.style.opacity = (0.15 + Math.random() * 0.35).toFixed(2);
    dustField.appendChild(sp);

    const t = gsap.to(sp, {
      y: "-=" + (40 + Math.random() * 80),
      x: "+=" + (Math.random() * 40 - 20),
      duration: dur,
      delay,
      repeat: -1,
      ease: "sine.inOut",
      yoyo: true,
    });
    dustTweens.push(t);
  }
  return dustTweens;
}

function getMaskHole(r: number, xPct: number, yPct: number): string {
  return `radial-gradient(circle at ${xPct.toFixed(2)}% ${yPct.toFixed(2)}%, transparent 0, transparent ${r}vmax, black ${r}vmax, black 100%)`;
}

function getLensScreenCenter(): { xPct: number; yPct: number } {
  const svg = document.getElementById(
    "cameraSvg",
  ) as unknown as SVGSVGElement | null;
  if (!svg) return { xPct: 50, yPct: 50 };
  const svgPt = svg.createSVGPoint();
  svgPt.x = LENS_LOCAL_X;
  svgPt.y = LENS_LOCAL_Y;
  const ctm = svg.getScreenCTM();
  if (!ctm) return { xPct: 50, yPct: 50 };
  const screenPt = svgPt.matrixTransform(ctm);
  return {
    xPct: (screenPt.x / window.innerWidth) * 100,
    yPct: (screenPt.y / window.innerHeight) * 100,
  };
}

export function initCameraIntro(
  refs: CameraRefs,
  onComplete: () => void,
): () => void {
  const {
    introOverlay,
    cameraRig,
    cameraAssembly,
    focusRing,
    irisGroup,
    caption,
    dustField,
    afBrackets,
  } = refs;

  if (!irisGroup || !dustField || !cameraRig) return () => {};

  const irisRingEl = buildIrisGroup(irisGroup);
  const irisState = { openness: REST_OPENNESS };
  setIris(irisRingEl, REST_OPENNESS);

  const dustTweens = buildDustParticles(dustField);

  // Idle animations
  const idleTl = gsap.timeline({ repeat: -1, yoyo: true });
  idleTl.to(cameraRig, { y: -8, rotateZ: 0.4, duration: 2.6, ease: "sine.inOut" });

  const assemblyTween = gsap.to(cameraAssembly, {
    scale: 1.012,
    duration: 3.2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    svgOrigin: SVG_ORIGIN,
  });

  const bracketsTween = gsap.to(afBrackets, {
    opacity: 0.25,
    duration: 1.4,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  const focusRingTween = gsap.to(focusRing, {
    rotate: 360,
    duration: 40,
    repeat: -1,
    ease: "none",
    transformOrigin: "center center",
  });

  // Mouse tracking
  let hovering = false;

  const onMouseEnter = () => {
    hovering = true;
    gsap.to(focusRing, {
      rotate: "+=30",
      duration: 0.6,
      ease: "power2.out",
      transformOrigin: "center center",
    });
    gsap.to(cameraAssembly, {
      scale: 1.03,
      duration: 0.5,
      ease: "power2.out",
      svgOrigin: SVG_ORIGIN,
    });
    gsap.to(irisState, {
      openness: REST_OPENNESS - 0.18,
      duration: 0.45,
      ease: "power2.out",
      onUpdate: () => setIris(irisRingEl, irisState.openness),
    });
  };

  const onMouseLeave = () => {
    hovering = false;
    gsap.to(cameraAssembly, {
      scale: 1,
      duration: 0.6,
      ease: "power2.out",
      svgOrigin: SVG_ORIGIN,
    });
    gsap.to(cameraRig, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "power2.out",
    });
    gsap.to(irisState, {
      openness: REST_OPENNESS,
      duration: 0.5,
      ease: "power2.out",
      onUpdate: () => setIris(irisRingEl, irisState.openness),
    });
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!hovering) return;
    const rect = cameraRig.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(cameraRig, {
      rotateY: px * 10,
      rotateX: -py * 10,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  cameraRig.addEventListener("mouseenter", onMouseEnter);
  cameraRig.addEventListener("mouseleave", onMouseLeave);
  cameraRig.addEventListener("mousemove", onMouseMove);

  const maskCenter = { xPct: 50, yPct: 50 };
  const setMaskHole = (r: number) => {
    if (!introOverlay) return;
    const mask = getMaskHole(r, maskCenter.xPct, maskCenter.yPct);
    introOverlay.style.webkitMaskImage = mask;
    introOverlay.style.maskImage = mask;
  };

  // Enter handler
  let entered = false;
  const enterSite = () => {
    if (entered) return;
    entered = true;

    idleTl.kill();
    assemblyTween.kill();
    bracketsTween.kill();
    focusRingTween.kill();
    dustTweens.forEach((t) => t.kill());
    gsap.killTweensOf(cameraAssembly);
    gsap.killTweensOf(cameraRig);
    gsap.killTweensOf(afBrackets);
    gsap.killTweensOf(focusRing);
    gsap.killTweensOf(irisState);

    gsap.set(cameraRig, { y: 0, rotateX: 0, rotateY: 0, rotateZ: 0, scale: 1 });
    gsap.set(cameraAssembly, { scale: 1, svgOrigin: SVG_ORIGIN });

    const lensScreen = getLensScreenCenter();
    maskCenter.xPct = lensScreen.xPct;
    maskCenter.yPct = lensScreen.yPct;

    const tl = gsap.timeline({ onComplete });
    const maskState = { r: 0 };
    setMaskHole(0);

    // Phase 1: Shutter click — recoil + iris snaps shut
    tl.to(cameraRig, { scale: 0.97, duration: 0.08, ease: "power2.out" })
      .to(caption, { opacity: 0, y: -12, duration: 0.25, ease: "power2.in" }, "<")
      .to(afBrackets, { opacity: 0, duration: 0.15, ease: "power2.in" }, "<")
      .to(irisState, {
        openness: 0,
        duration: 0.18,
        ease: "power3.in",
        onUpdate: () => setIris(irisRingEl, irisState.openness),
      }, "<")
      .to(cameraRig, { scale: 1, duration: 0.08, ease: "power2.out" })
      .addLabel("fly");

    // Phase 2: Fly through the lens — zoom + iris opens + mask reveals site
    const FLY_DURATION = 0.9;
    tl.to(cameraAssembly, {
      scale: 30,
      duration: FLY_DURATION,
      ease: "power2.in",
      svgOrigin: SVG_ORIGIN,
    }, "fly")
      .to(irisState, {
        openness: 1,
        duration: FLY_DURATION,
        ease: "power2.in",
        onUpdate: () => setIris(irisRingEl, irisState.openness),
      }, "fly")
      .to(maskState, {
        r: 160,
        duration: FLY_DURATION,
        ease: "power4.in",
        onUpdate: () => setMaskHole(maskState.r),
      }, "fly")
      .to(dustField, {
        opacity: 0,
        duration: FLY_DURATION * 0.5,
        ease: "power2.in",
      }, "fly")
      .set(introOverlay, { pointerEvents: "none" }, `fly+=${FLY_DURATION * 0.7}`);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      enterSite();
    }
  };

  cameraRig.addEventListener("click", enterSite);
  cameraRig.addEventListener("keydown", onKeyDown);

  return () => {
    document.body.classList.remove("locked");
    idleTl.kill();
    assemblyTween.kill();
    bracketsTween.kill();
    focusRingTween.kill();
    dustTweens.forEach((t) => t.kill());
    cameraRig.removeEventListener("mouseenter", onMouseEnter);
    cameraRig.removeEventListener("mouseleave", onMouseLeave);
    cameraRig.removeEventListener("mousemove", onMouseMove);
    cameraRig.removeEventListener("click", enterSite);
    cameraRig.removeEventListener("keydown", onKeyDown);
  };
}
