import { useEffect, useRef } from "react";
import { initCameraIntro, type CameraRefs } from "@/animations/camera";

interface IntroAnimationProps {
  onComplete: () => void;
}

export function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const introOverlayRef = useRef<HTMLDivElement>(null);
  const cameraRigRef = useRef<HTMLDivElement>(null);
  const cameraAssemblyRef = useRef<SVGGElement>(null);
  const focusRingRef = useRef<SVGCircleElement>(null);
  const irisGroupRef = useRef<SVGGElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const dustFieldRef = useRef<HTMLDivElement>(null);
  const afBracketsRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) {
      onComplete();
      return;
    }

    document.body.classList.add("locked");

    const refs: CameraRefs = {
      introOverlay: introOverlayRef.current,
      cameraRig: cameraRigRef.current,
      cameraAssembly: cameraAssemblyRef.current,
      focusRing: focusRingRef.current,
      irisGroup: irisGroupRef.current,
      caption: captionRef.current,
      dustField: dustFieldRef.current,
      afBrackets: afBracketsRef.current,
    };

    const cleanup = initCameraIntro(refs, () => {
      document.body.classList.remove("locked");
      onComplete();
    });

    return cleanup;
  }, [onComplete]);

  return (
    <div id="introOverlay" ref={introOverlayRef}>
      {/* Film grain overlay */}
      <div className="intro-grain" aria-hidden />

      <div className="dust-field" ref={dustFieldRef} />

      <div className="stage">
        <div
          id="cameraRig"
          ref={cameraRigRef}
          role="button"
          tabIndex={0}
          aria-label="Click the camera to enter Vinit Patel Photography Studio"
        >
          <svg id="cameraSvg" viewBox="0 0 480 300">
            <defs>
              <filter id="filmGrain">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.65"
                  numOctaves="3"
                  stitchTiles="stitch"
                />
                <feColorMatrix type="saturate" values="0" />
                <feBlend in="SourceGraphic" mode="overlay" result="blend" />
                <feComposite in="blend" in2="SourceGraphic" operator="in" />
              </filter>
              <filter id="lensGlow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#232324" />
                <stop offset="45%" stopColor="#121213" />
                <stop offset="100%" stopColor="#050505" />
              </linearGradient>
              <linearGradient id="topPlateGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2c2c2d" />
                <stop offset="100%" stopColor="#0a0a0a" />
              </linearGradient>
              <radialGradient id="ringMetal" cx="34%" cy="24%" r="80%">
                <stop offset="0%" stopColor="#eceef0" />
                <stop offset="28%" stopColor="#aeb0b3" />
                <stop offset="62%" stopColor="#54565a" />
                <stop offset="100%" stopColor="#161718" />
              </radialGradient>
              <radialGradient id="glassGrad" cx="30%" cy="25%" r="72%">
                <stop offset="0%" stopColor="#e0ecf4" stopOpacity="0.25" />
                <stop offset="18%" stopColor="#7fa8cc" stopOpacity="0.18" />
                <stop offset="45%" stopColor="#4a6e96" stopOpacity="0.12" />
                <stop offset="75%" stopColor="#283848" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#101820" stopOpacity="0.25" />
              </radialGradient>
              {/* Chromatic aberration at lens edge */}
              <radialGradient id="chromaticAberration" cx="50%" cy="50%" r="50%">
                <stop offset="80%" stopColor="transparent" />
                <stop offset="92%" stopColor="#1a0a2e" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#0a1a2e" stopOpacity="0.15" />
              </radialGradient>
              <pattern
                id="gripTexture"
                width="7"
                height="7"
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(45)"
              >
                <rect width="7" height="7" fill="#0b0b0b" />
                <rect width="3.4" height="3.4" fill="#1d1d1e" />
              </pattern>
              <pattern
                id="knurl"
                width="3.2"
                height="3.2"
                patternUnits="userSpaceOnUse"
              >
                <rect width="3.2" height="3.2" fill="#2e2e30" />
                <rect x="0" y="0" width="1.1" height="3.2" fill="#141415" />
              </pattern>
              <path id="ringArcTop" d="M 215 180 A 75 75 0 0 1 365 180" fill="none" />
              <path id="ringArcBottom" d="M 236 180 A 54 54 0 0 0 344 180" fill="none" />
              <clipPath id="irisClip">
                <circle cx="0" cy="0" r="54" />
              </clipPath>
            </defs>

            <g id="cameraAssembly" ref={cameraAssemblyRef}>
              <g id="cameraBody">
                <circle cx="62" cy="150" r="12" fill="none" stroke="url(#ringMetal)" strokeWidth="4" />
                <circle cx="418" cy="150" r="12" fill="none" stroke="url(#ringMetal)" strokeWidth="4" />
                <rect x="50" y="95" width="380" height="175" rx="10" fill="url(#bodyGrad)" />
                <rect x="50" y="80" width="380" height="18" rx="5" fill="url(#topPlateGrad)" />
                <rect x="88" y="82" width="20" height="9" rx="4" fill="#0a0a0a" stroke="#3a3a3b" strokeWidth="1" />
                <circle cx="150" cy="86" r="9" fill="#141415" stroke="url(#ringMetal)" strokeWidth="1.6" />
                <circle cx="150" cy="86" r="2" fill="#8b8880" />
                <circle cx="176" cy="86" r="2.4" fill="#3a1414" />
                <text x="98" y="132" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="19" fill="#eceae4" letterSpacing="0.5">
                  STUDIO 1<tspan fill="#c9a227" fontSize="12" dy="-6">R</tspan>
                </text>
                <text x="382" y="130" textAnchor="end" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="17" fill="#eceae4" letterSpacing="2">
                  VP STUDIO
                </text>
                <rect x="62" y="150" width="86" height="108" rx="8" fill="url(#gripTexture)" />
                <rect x="62" y="150" width="86" height="108" rx="8" fill="none" stroke="#000" strokeOpacity="0.4" strokeWidth="1" />
              </g>

              <g id="lensGroup" transform="translate(290,180)">
                <circle r="75" fill="url(#ringMetal)" />
                <circle r="75" fill="none" stroke="#050505" strokeWidth="2" opacity="0.5" />
                <text fontFamily="Inter, sans-serif" fontSize="9" fill="#1c1d1e" letterSpacing="2.5">
                  <textPath href="#ringArcTop" startOffset="50%" textAnchor="middle" transform="translate(-290,-180)">
                    STUDIO OPTIK
                  </textPath>
                </text>
                <circle id="focusRing" ref={focusRingRef} r="65" fill="url(#knurl)" stroke="#0a0a0a" strokeWidth="1" />
                <circle r="65" fill="none" stroke="#050505" strokeWidth="1.4" opacity="0.6" />
                <circle r="54" fill="url(#ringMetal)" />
                <text fontFamily="Inter, sans-serif" fontSize="7.5" fill="#1c1d1e" letterSpacing="1.6">
                  <textPath href="#ringArcBottom" startOffset="50%" textAnchor="middle" transform="translate(-290,-180)">
                    F2.0 · 35MM STUDIO
                  </textPath>
                </text>
                <text x="-68" y="4" fontFamily="Inter, sans-serif" fontSize="8" fill="#3a3b3c" letterSpacing="1" transform="rotate(-90 -68 4)">
                  Ø49
                </text>
                <circle r="54" fill="url(#glassGrad)" />
                {/* Chromatic aberration ring */}
                <circle r="54" fill="url(#chromaticAberration)" />

                <g id="irisGroup" ref={irisGroupRef} clipPath="url(#irisClip)" />

                <circle r="7" fill="#020202" />
                {/* Main lens reflection */}
                <ellipse cx="-16" cy="-20" rx="11" ry="6" fill="#ffffff" opacity="0.22" transform="rotate(-30)" />
                {/* Secondary small reflection */}
                <ellipse cx="18" cy="22" rx="4" ry="2.5" fill="#ffffff" opacity="0.08" transform="rotate(-30)" />
                {/* Radial light bloom */}
                <circle r="28" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1.5" />
                <circle cx="-34" cy="36" r="2.2" fill="#b5342f" />
                <g id="afBrackets" ref={afBracketsRef} opacity="0.6">
                  <path className="af-bracket" d="M -32 -32 l0 10 M -32 -32 l10 0" />
                  <path className="af-bracket" d="M 32 -32 l0 10 M 32 -32 l-10 0" />
                  <path className="af-bracket" d="M -32 32 l0 -10 M -32 32 l10 0" />
                  <path className="af-bracket" d="M 32 32 l0 -10 M 32 32 l-10 0" />
                </g>
              </g>
            </g>
          </svg>
        </div>

        <div className="intro-caption" ref={captionRef}>
          <h1>Vinit Patel Photography Studio</h1>
          <p>Click the camera to enter</p>
        </div>
      </div>
    </div>
  );
}
