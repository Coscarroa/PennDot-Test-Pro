import React from 'react';

interface RoadSignSvgProps {
  signId: string;
  className?: string;
  size?: number;
}

export const RoadSignSvg: React.FC<RoadSignSvgProps> = ({
  signId,
  className = '',
  size = 120
}) => {
  switch (signId) {
    case 'sign-stop':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={`drop-shadow-md select-none ${className}`}
        >
          {/* Octagon shape */}
          <polygon
            points="29.3,2 70.7,2 98,29.3 98,70.7 70.7,98 29.3,98 2,70.7 2,29.3"
            fill="#dc2626"
            stroke="#ffffff"
            strokeWidth="3.5"
          />
          <polygon
            points="30.2,5.5 69.8,5.5 94.5,30.2 94.5,69.8 69.8,94.5 30.2,94.5 5.5,69.8 5.5,30.2"
            fill="#dc2626"
            stroke="#ffffff"
            strokeWidth="1.5"
          />
          <text
            x="50"
            y="61"
            fill="#ffffff"
            fontSize="26"
            fontWeight="900"
            fontFamily="Arial, sans-serif"
            textAnchor="middle"
            letterSpacing="1"
          >
            STOP
          </text>
        </svg>
      );

    case 'sign-yield':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={`drop-shadow-md select-none ${className}`}
        >
          <polygon
            points="5,12 95,12 50,92"
            fill="#ffffff"
            stroke="#dc2626"
            strokeWidth="12"
            strokeLinejoin="round"
          />
          <text
            x="50"
            y="40"
            fill="#dc2626"
            fontSize="16"
            fontWeight="900"
            fontFamily="Arial, sans-serif"
            textAnchor="middle"
          >
            YIELD
          </text>
        </svg>
      );

    case 'sign-no-passing-zone':
      return (
        <svg
          width={size * 1.35}
          height={size * 0.9}
          viewBox="0 0 140 90"
          className={`drop-shadow-md select-none ${className}`}
        >
          {/* Pennant pointing right */}
          <polygon
            points="5,5 135,45 5,85"
            fill="#facc15"
            stroke="#000000"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <polygon
            points="9,10 126,45 9,80"
            fill="none"
            stroke="#000000"
            strokeWidth="1.5"
          />
          <text
            x="32"
            y="33"
            fill="#000000"
            fontSize="10"
            fontWeight="900"
            fontFamily="Arial, sans-serif"
            letterSpacing="0.5"
          >
            NO
          </text>
          <text
            x="32"
            y="48"
            fill="#000000"
            fontSize="10"
            fontWeight="900"
            fontFamily="Arial, sans-serif"
            letterSpacing="0.5"
          >
            PASSING
          </text>
          <text
            x="32"
            y="63"
            fill="#000000"
            fontSize="10"
            fontWeight="900"
            fontFamily="Arial, sans-serif"
            letterSpacing="0.5"
          >
            ZONE
          </text>
        </svg>
      );

    case 'sign-do-not-enter':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={`drop-shadow-md select-none ${className}`}
        >
          <rect
            x="4"
            y="4"
            width="92"
            height="92"
            rx="8"
            fill="#ffffff"
            stroke="#000000"
            strokeWidth="3"
          />
          <circle cx="50" cy="50" r="41" fill="#dc2626" />
          <rect
            x="18"
            y="43"
            width="64"
            height="14"
            rx="2"
            fill="#ffffff"
          />
          <text
            x="50"
            y="32"
            fill="#ffffff"
            fontSize="9"
            fontWeight="900"
            fontFamily="Arial, sans-serif"
            textAnchor="middle"
          >
            DO NOT
          </text>
          <text
            x="50"
            y="76"
            fill="#ffffff"
            fontSize="11"
            fontWeight="900"
            fontFamily="Arial, sans-serif"
            textAnchor="middle"
          >
            ENTER
          </text>
        </svg>
      );

    case 'sign-wrong-way':
      return (
        <svg
          width={size * 1.3}
          height={size * 0.9}
          viewBox="0 0 120 80"
          className={`drop-shadow-md select-none ${className}`}
        >
          <rect
            x="4"
            y="4"
            width="112"
            height="72"
            rx="6"
            fill="#dc2626"
            stroke="#ffffff"
            strokeWidth="3.5"
          />
          <rect
            x="8"
            y="8"
            width="104"
            height="64"
            rx="4"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1"
          />
          <text
            x="60"
            y="35"
            fill="#ffffff"
            fontSize="14"
            fontWeight="900"
            fontFamily="Arial, sans-serif"
            textAnchor="middle"
            letterSpacing="1"
          >
            WRONG
          </text>
          <text
            x="60"
            y="58"
            fill="#ffffff"
            fontSize="16"
            fontWeight="900"
            fontFamily="Arial, sans-serif"
            textAnchor="middle"
            letterSpacing="1"
          >
            WAY
          </text>
        </svg>
      );

    case 'sign-no-u-turn':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={`drop-shadow-md select-none ${className}`}
        >
          <rect
            x="4"
            y="4"
            width="92"
            height="92"
            rx="8"
            fill="#ffffff"
            stroke="#000000"
            strokeWidth="3"
          />
          <path
            d="M 64,66 L 64,46 C 64,32 36,32 36,46 L 36,60"
            fill="none"
            stroke="#000000"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <polygon points="36,70 28,58 44,58" fill="#000000" />
          <circle
            cx="50"
            cy="50"
            r="38"
            fill="none"
            stroke="#dc2626"
            strokeWidth="7"
          />
          <line
            x1="24"
            y1="24"
            x2="76"
            y2="76"
            stroke="#dc2626"
            strokeWidth="7"
          />
        </svg>
      );

    case 'sign-no-right-turn':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={`drop-shadow-md select-none ${className}`}
        >
          <rect
            x="4"
            y="4"
            width="92"
            height="92"
            rx="8"
            fill="#ffffff"
            stroke="#000000"
            strokeWidth="3"
          />
          <path
            d="M 38,72 L 38,50 C 38,40 45,36 56,36 L 68,36"
            fill="none"
            stroke="#000000"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <polygon points="76,36 64,28 64,44" fill="#000000" />
          <circle
            cx="50"
            cy="50"
            r="38"
            fill="none"
            stroke="#dc2626"
            strokeWidth="7"
          />
          <line
            x1="24"
            y1="24"
            x2="76"
            y2="76"
            stroke="#dc2626"
            strokeWidth="7"
          />
        </svg>
      );

    case 'sign-divided-highway':
      return (
        <svg
          width={size * 1.1}
          height={size * 0.9}
          viewBox="0 0 110 90"
          className={`drop-shadow-md select-none ${className}`}
        >
          <rect
            x="3"
            y="3"
            width="104"
            height="84"
            rx="6"
            fill="#ffffff"
            stroke="#000000"
            strokeWidth="3"
          />
          <text
            x="55"
            y="20"
            fill="#000000"
            fontSize="10"
            fontWeight="900"
            fontFamily="Arial, sans-serif"
            textAnchor="middle"
          >
            DIVIDED
          </text>
          {/* Opposing arrows with median in between */}
          <line x1="20" y1="42" x2="80" y2="42" stroke="#000000" strokeWidth="3" />
          <polygon points="14,42 24,36 24,48" fill="#000000" />
          <line x1="90" y1="52" x2="30" y2="52" stroke="#000000" strokeWidth="3" />
          <polygon points="96,52 86,46 86,58" fill="#000000" />
          <text
            x="55"
            y="76"
            fill="#000000"
            fontSize="10"
            fontWeight="900"
            fontFamily="Arial, sans-serif"
            textAnchor="middle"
          >
            HIGHWAY
          </text>
        </svg>
      );

    case 'sign-divided-highway-begin':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={`drop-shadow-md select-none ${className}`}
        >
          <polygon
            points="50,4 96,50 50,96 4,50"
            fill="#facc15"
            stroke="#000000"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <ellipse cx="50" cy="36" rx="8" ry="12" fill="#000000" />
          <path
            d="M 36,75 L 36,45 C 36,36 40,32 40,24"
            fill="none"
            stroke="#000000"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <polygon points="40,16 33,26 47,26" fill="#000000" />
          <path
            d="M 60,26 C 60,34 64,40 64,55 L 64,74"
            fill="none"
            stroke="#000000"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <polygon points="64,84 57,74 71,74" fill="#000000" />
        </svg>
      );

    case 'sign-divided-highway-end':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={`drop-shadow-md select-none ${className}`}
        >
          <polygon
            points="50,4 96,50 50,96 4,50"
            fill="#facc15"
            stroke="#000000"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <ellipse cx="50" cy="64" rx="8" ry="12" fill="#000000" />
          <path
            d="M 64,74 C 64,60 60,52 60,35 L 60,26"
            fill="none"
            stroke="#000000"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <polygon points="60,16 53,26 67,26" fill="#000000" />
          <path
            d="M 40,24 C 40,32 36,42 36,65 L 36,74"
            fill="none"
            stroke="#000000"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <polygon points="36,84 29,74 43,74" fill="#000000" />
        </svg>
      );

    case 'sign-two-way-traffic':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={`drop-shadow-md select-none ${className}`}
        >
          <polygon
            points="50,4 96,50 50,96 4,50"
            fill="#facc15"
            stroke="#000000"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Arrow Up */}
          <line x1="38" y1="72" x2="38" y2="34" stroke="#000000" strokeWidth="6" />
          <polygon points="38,24 29,38 47,38" fill="#000000" />
          {/* Arrow Down */}
          <line x1="62" y1="28" x2="62" y2="66" stroke="#000000" strokeWidth="6" />
          <polygon points="62,76 53,62 71,62" fill="#000000" />
        </svg>
      );

    case 'sign-keep-right':
      return (
        <svg
          width={size * 0.85}
          height={size * 1.1}
          viewBox="0 0 85 110"
          className={`drop-shadow-md select-none ${className}`}
        >
          <rect
            x="3"
            y="3"
            width="79"
            height="104"
            rx="6"
            fill="#ffffff"
            stroke="#000000"
            strokeWidth="3"
          />
          <text
            x="42"
            y="22"
            fill="#000000"
            fontSize="12"
            fontWeight="900"
            fontFamily="Arial, sans-serif"
            textAnchor="middle"
          >
            KEEP
          </text>
          {/* Curved arrow around island */}
          <ellipse cx="32" cy="52" rx="7" ry="14" fill="#000000" />
          <path
            d="M 40,74 C 52,70 56,58 56,44"
            fill="none"
            stroke="#000000"
            strokeWidth="5"
          />
          <polygon points="56,36 48,46 64,46" fill="#000000" />
          <text
            x="42"
            y="98"
            fill="#000000"
            fontSize="12"
            fontWeight="900"
            fontFamily="Arial, sans-serif"
            textAnchor="middle"
          >
            RIGHT
          </text>
        </svg>
      );

    case 'sign-railroad-crossbuck':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={`drop-shadow-md select-none ${className}`}
        >
          <g transform="rotate(35 50 50)">
            <rect
              x="10"
              y="40"
              width="80"
              height="20"
              rx="3"
              fill="#ffffff"
              stroke="#000000"
              strokeWidth="2"
            />
            <text
              x="50"
              y="54"
              fill="#000000"
              fontSize="7.5"
              fontWeight="900"
              fontFamily="Arial, sans-serif"
              textAnchor="middle"
              letterSpacing="0.8"
            >
              RAILROAD
            </text>
          </g>
          <g transform="rotate(-35 50 50)">
            <rect
              x="10"
              y="40"
              width="80"
              height="20"
              rx="3"
              fill="#ffffff"
              stroke="#000000"
              strokeWidth="2"
            />
            <text
              x="50"
              y="54"
              fill="#000000"
              fontSize="7.5"
              fontWeight="900"
              fontFamily="Arial, sans-serif"
              textAnchor="middle"
              letterSpacing="0.8"
            >
              CROSSING
            </text>
          </g>
        </svg>
      );

    case 'sign-railroad-advance':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={`drop-shadow-md select-none ${className}`}
        >
          <circle
            cx="50"
            cy="50"
            r="46"
            fill="#facc15"
            stroke="#000000"
            strokeWidth="3.5"
          />
          <line x1="20" y1="20" x2="80" y2="80" stroke="#000000" strokeWidth="6" />
          <line x1="20" y1="80" x2="80" y2="20" stroke="#000000" strokeWidth="6" />
          <text
            x="24"
            y="57"
            fill="#000000"
            fontSize="22"
            fontWeight="900"
            fontFamily="Arial, sans-serif"
            textAnchor="middle"
          >
            R
          </text>
          <text
            x="76"
            y="57"
            fill="#000000"
            fontSize="22"
            fontWeight="900"
            fontFamily="Arial, sans-serif"
            textAnchor="middle"
          >
            R
          </text>
        </svg>
      );

    case 'sign-traffic-signal-ahead':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={`drop-shadow-md select-none ${className}`}
        >
          <polygon
            points="50,4 96,50 50,96 4,50"
            fill="#facc15"
            stroke="#000000"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Mini traffic light inside */}
          <rect
            x="41"
            y="26"
            width="18"
            height="48"
            rx="4"
            fill="#1e293b"
            stroke="#000000"
            strokeWidth="1.5"
          />
          <circle cx="50" cy="35" r="4.5" fill="#ef4444" />
          <circle cx="50" cy="50" r="4.5" fill="#eab308" />
          <circle cx="50" cy="65" r="4.5" fill="#22c55e" />
        </svg>
      );

    case 'sign-school-zone':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={`drop-shadow-md select-none ${className}`}
        >
          <polygon
            points="50,4 95,38 80,94 20,94 5,38"
            fill="#a3e635"
            stroke="#000000"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <circle cx="40" cy="38" r="5" fill="#000000" />
          <path
            d="M 40,44 L 40,68 M 40,50 L 32,58 M 40,50 L 48,58 M 40,68 L 34,82 M 40,68 L 46,82"
            stroke="#000000"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <circle cx="62" cy="48" r="4.5" fill="#000000" />
          <path
            d="M 62,53 L 62,70 M 62,58 L 54,64 M 62,58 L 70,64 M 62,70 L 57,82 M 62,70 L 67,82"
            stroke="#000000"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'sign-pedestrian-crossing':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={`drop-shadow-md select-none ${className}`}
        >
          <polygon
            points="50,4 96,50 50,96 4,50"
            fill="#facc15"
            stroke="#000000"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <circle cx="50" cy="34" r="5.5" fill="#000000" />
          <path
            d="M 50,40 L 50,62 M 50,46 L 38,54 M 50,46 L 62,54 M 50,62 L 40,78 M 50,62 L 60,78"
            stroke="#000000"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'sign-slippery-wet':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={`drop-shadow-md select-none ${className}`}
        >
          <polygon
            points="50,4 96,50 50,96 4,50"
            fill="#facc15"
            stroke="#000000"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <rect x="42" y="32" width="16" height="22" rx="3" fill="#000000" />
          <path
            d="M 38,55 C 33,63 43,68 36,78"
            fill="none"
            stroke="#000000"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M 62,55 C 57,63 67,68 60,78"
            fill="none"
            stroke="#000000"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'sign-steep-hill':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={`drop-shadow-md select-none ${className}`}
        >
          <polygon
            points="50,4 96,50 50,96 4,50"
            fill="#facc15"
            stroke="#000000"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <polygon points="20,74 80,74 80,48" fill="#000000" />
          <g transform="translate(38, 38) rotate(23)">
            <rect x="0" y="0" width="22" height="12" fill="#000000" />
            <rect x="22" y="4" width="8" height="8" fill="#000000" />
            <circle cx="6" cy="14" r="3" fill="#000000" />
            <circle cx="26" cy="14" r="3" fill="#000000" />
          </g>
        </svg>
      );

    case 'sign-low-shoulder':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={`drop-shadow-md select-none ${className}`}
        >
          <polygon
            points="50,4 96,50 50,96 4,50"
            fill="#facc15"
            stroke="#000000"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Car with one wheel off drop off */}
          <line x1="20" y1="65" x2="55" y2="65" stroke="#000000" strokeWidth="4" />
          <line x1="55" y1="75" x2="80" y2="75" stroke="#000000" strokeWidth="4" />
          <line x1="55" y1="65" x2="55" y2="75" stroke="#000000" strokeWidth="4" />
          <g transform="translate(30, 45) rotate(12)">
            <rect x="0" y="0" width="34" height="15" rx="3" fill="#000000" />
            <circle cx="6" cy="18" r="4" fill="#000000" />
            <circle cx="28" cy="18" r="4" fill="#000000" />
          </g>
        </svg>
      );

    case 'sign-curve-right':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={`drop-shadow-md select-none ${className}`}
        >
          <polygon
            points="50,4 96,50 50,96 4,50"
            fill="#facc15"
            stroke="#000000"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <path
            d="M 40,75 L 40,50 C 40,36 50,30 65,30"
            fill="none"
            stroke="#000000"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <polygon points="75,30 63,22 63,38" fill="#000000" />
        </svg>
      );

    case 'sign-winding-road':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={`drop-shadow-md select-none ${className}`}
        >
          <polygon
            points="50,4 96,50 50,96 4,50"
            fill="#facc15"
            stroke="#000000"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <path
            d="M 50,75 C 32,65 32,55 50,48 C 68,40 68,30 50,25"
            fill="none"
            stroke="#000000"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <polygon points="50,16 42,26 58,26" fill="#000000" />
        </svg>
      );

    case 'sign-crossroad':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={`drop-shadow-md select-none ${className}`}
        >
          <polygon
            points="50,4 96,50 50,96 4,50"
            fill="#facc15"
            stroke="#000000"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <line x1="50" y1="22" x2="50" y2="78" stroke="#000000" strokeWidth="8" />
          <line x1="22" y1="50" x2="78" y2="50" stroke="#000000" strokeWidth="8" />
        </svg>
      );

    case 'sign-t-intersection':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={`drop-shadow-md select-none ${className}`}
        >
          <polygon
            points="50,4 96,50 50,96 4,50"
            fill="#facc15"
            stroke="#000000"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <line x1="50" y1="36" x2="50" y2="78" stroke="#000000" strokeWidth="8" />
          <line x1="24" y1="36" x2="76" y2="36" stroke="#000000" strokeWidth="8" />
        </svg>
      );

    case 'sign-lane-ends':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={`drop-shadow-md select-none ${className}`}
        >
          <polygon
            points="50,4 96,50 50,96 4,50"
            fill="#facc15"
            stroke="#000000"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <line x1="36" y1="22" x2="36" y2="78" stroke="#000000" strokeWidth="5" />
          <path
            d="M 64,78 L 64,55 L 50,32 L 50,22"
            fill="none"
            stroke="#000000"
            strokeWidth="5"
          />
        </svg>
      );

    case 'sign-exit-only':
      return (
        <svg
          width={size * 1.3}
          height={size * 0.9}
          viewBox="0 0 130 90"
          className={`drop-shadow-md select-none ${className}`}
        >
          {/* Main green highway guide sign */}
          <rect
            x="3"
            y="3"
            width="124"
            height="84"
            rx="6"
            fill="#059669"
            stroke="#ffffff"
            strokeWidth="3"
          />
          <text
            x="65"
            y="26"
            fill="#ffffff"
            fontSize="10"
            fontWeight="900"
            fontFamily="Arial, sans-serif"
            textAnchor="middle"
          >
            Colonial Park
          </text>
          <text
            x="65"
            y="42"
            fill="#ffffff"
            fontSize="9"
            fontWeight="700"
            fontFamily="Arial, sans-serif"
            textAnchor="middle"
          >
            NEXT EXIT
          </text>
          {/* Yellow EXIT ONLY panel at bottom */}
          <rect
            x="4"
            y="54"
            width="122"
            height="32"
            rx="2"
            fill="#facc15"
            stroke="#000000"
            strokeWidth="1.5"
          />
          <text
            x="65"
            y="74"
            fill="#000000"
            fontSize="11"
            fontWeight="900"
            fontFamily="Arial, sans-serif"
            textAnchor="middle"
          >
            EXIT ONLY
          </text>
        </svg>
      );

    case 'sign-work-zone':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={`drop-shadow-md select-none ${className}`}
        >
          <polygon
            points="50,4 96,50 50,96 4,50"
            fill="#ea580c"
            stroke="#000000"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <text
            x="50"
            y="42"
            fill="#000000"
            fontSize="10"
            fontWeight="900"
            fontFamily="Arial, sans-serif"
            textAnchor="middle"
          >
            ROAD
          </text>
          <text
            x="50"
            y="54"
            fill="#000000"
            fontSize="10"
            fontWeight="900"
            fontFamily="Arial, sans-serif"
            textAnchor="middle"
          >
            WORK
          </text>
          <text
            x="50"
            y="66"
            fill="#000000"
            fontSize="9"
            fontWeight="900"
            fontFamily="Arial, sans-serif"
            textAnchor="middle"
          >
            AHEAD
          </text>
        </svg>
      );

    case 'sign-flagger':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={`drop-shadow-md select-none ${className}`}
        >
          <polygon
            points="50,4 96,50 50,96 4,50"
            fill="#ea580c"
            stroke="#000000"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <circle cx="48" cy="30" r="5.5" fill="#000000" />
          <path
            d="M 48,36 L 48,64 M 48,46 L 68,36 M 48,46 L 38,58 M 48,64 L 40,80 M 48,64 L 56,80"
            stroke="#000000"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <polygon points="68,26 84,32 68,44" fill="#000000" />
        </svg>
      );

    case 'sign-workers-ahead':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={`drop-shadow-md select-none ${className}`}
        >
          <polygon
            points="50,4 96,50 50,96 4,50"
            fill="#ea580c"
            stroke="#000000"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <circle cx="42" cy="34" r="5" fill="#000000" />
          <path
            d="M 42,40 L 48,62 M 42,46 L 56,54 M 48,62 L 40,78 M 48,62 L 58,78"
            stroke="#000000"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Shovel line */}
          <line x1="56" y1="54" x2="68" y2="76" stroke="#000000" strokeWidth="2.5" />
          <polygon points="65,74 72,78 68,82" fill="#000000" />
        </svg>
      );

    case 'sign-arrow-board-caution':
      return (
        <svg
          width={size * 1.3}
          height={size * 0.8}
          viewBox="0 0 120 70"
          className={`drop-shadow-md select-none ${className}`}
        >
          {/* Black electric arrow board */}
          <rect
            x="3"
            y="3"
            width="114"
            height="64"
            rx="6"
            fill="#090d16"
            stroke="#475569"
            strokeWidth="2"
          />
          {/* 4 flashing corner caution lights */}
          <circle cx="20" cy="20" r="7" fill="#facc15" className="animate-pulse" />
          <circle cx="100" cy="20" r="7" fill="#facc15" className="animate-pulse" />
          <circle cx="20" cy="50" r="7" fill="#facc15" className="animate-pulse" />
          <circle cx="100" cy="50" r="7" fill="#facc15" className="animate-pulse" />
          <text
            x="60"
            y="38"
            fill="#94a3b8"
            fontSize="8"
            fontWeight="800"
            fontFamily="Arial, sans-serif"
            textAnchor="middle"
          >
            PRECAUCIÓN
          </text>
        </svg>
      );

    case 'sign-lane-arrow-green':
      return (
        <svg
          width={size * 0.9}
          height={size * 1.1}
          viewBox="0 0 90 110"
          className={`drop-shadow-md select-none ${className}`}
        >
          <rect
            x="3"
            y="3"
            width="84"
            height="104"
            rx="8"
            fill="#0f172a"
            stroke="#334155"
            strokeWidth="3"
          />
          {/* Green downward arrow for lane control */}
          <line x1="45" y1="25" x2="45" y2="70" stroke="#22c55e" strokeWidth="8" strokeLinecap="round" />
          <polygon points="45,86 30,68 60,68" fill="#22c55e" />
        </svg>
      );

    case 'sign-center-left-turn':
      return (
        <svg
          width={size * 0.9}
          height={size * 1.1}
          viewBox="0 0 90 110"
          className={`drop-shadow-md select-none ${className}`}
        >
          <rect
            x="3"
            y="3"
            width="84"
            height="104"
            rx="6"
            fill="#ffffff"
            stroke="#000000"
            strokeWidth="3"
          />
          <text
            x="45"
            y="20"
            fill="#000000"
            fontSize="9"
            fontWeight="900"
            fontFamily="Arial, sans-serif"
            textAnchor="middle"
          >
            CENTER
          </text>
          <text
            x="45"
            y="31"
            fill="#000000"
            fontSize="9"
            fontWeight="900"
            fontFamily="Arial, sans-serif"
            textAnchor="middle"
          >
            LANE
          </text>
          <path
            d="M 58,40 C 44,40 38,52 38,62"
            fill="none"
            stroke="#000000"
            strokeWidth="4"
          />
          <polygon points="32,60 38,72 44,60" fill="#000000" />
          <path
            d="M 32,80 C 46,80 52,68 52,58"
            fill="none"
            stroke="#000000"
            strokeWidth="4"
          />
          <polygon points="58,60 52,48 46,60" fill="#000000" />
          <text
            x="45"
            y="98"
            fill="#000000"
            fontSize="12"
            fontWeight="900"
            fontFamily="Arial, sans-serif"
            textAnchor="middle"
          >
            ONLY
          </text>
        </svg>
      );

    case 'sign-speed-limit':
    case 'sign-speed-limit-35':
      return (
        <svg
          width={size * 0.85}
          height={size * 1.1}
          viewBox="0 0 85 110"
          className={`drop-shadow-md select-none ${className}`}
        >
          <rect
            x="3"
            y="3"
            width="79"
            height="104"
            rx="6"
            fill="#ffffff"
            stroke="#000000"
            strokeWidth="3"
          />
          <text
            x="42"
            y="26"
            fill="#000000"
            fontSize="11"
            fontWeight="900"
            fontFamily="Arial, sans-serif"
            textAnchor="middle"
          >
            SPEED
          </text>
          <text
            x="42"
            y="42"
            fill="#000000"
            fontSize="12"
            fontWeight="900"
            fontFamily="Arial, sans-serif"
            textAnchor="middle"
          >
            LIMIT
          </text>
          <text
            x="42"
            y="88"
            fill="#000000"
            fontSize="38"
            fontWeight="900"
            fontFamily="Arial, sans-serif"
            textAnchor="middle"
          >
            35
          </text>
        </svg>
      );

    case 'sign-speed-limit-20':
      return (
        <svg
          width={size * 0.85}
          height={size * 1.1}
          viewBox="0 0 85 110"
          className={`drop-shadow-md select-none ${className}`}
        >
          <rect
            x="3"
            y="3"
            width="79"
            height="104"
            rx="6"
            fill="#ffffff"
            stroke="#000000"
            strokeWidth="3"
          />
          <text
            x="42"
            y="26"
            fill="#000000"
            fontSize="11"
            fontWeight="900"
            fontFamily="Arial, sans-serif"
            textAnchor="middle"
          >
            SPEED
          </text>
          <text
            x="42"
            y="42"
            fill="#000000"
            fontSize="12"
            fontWeight="900"
            fontFamily="Arial, sans-serif"
            textAnchor="middle"
          >
            LIMIT
          </text>
          <text
            x="42"
            y="88"
            fill="#000000"
            fontSize="38"
            fontWeight="900"
            fontFamily="Arial, sans-serif"
            textAnchor="middle"
          >
            20
          </text>
        </svg>
      );

    case 'sign-traffic-light':
      return (
        <svg
          width={size * 0.6}
          height={size * 1.2}
          viewBox="0 0 60 130"
          className={`drop-shadow-md select-none ${className}`}
        >
          <rect
            x="5"
            y="5"
            width="50"
            height="120"
            rx="10"
            fill="#1e293b"
            stroke="#475569"
            strokeWidth="3"
          />
          <circle cx="30" cy="28" r="14" fill="#ef4444" stroke="#991b1b" strokeWidth="2" />
          <circle cx="30" cy="65" r="14" fill="#eab308" stroke="#854d0e" strokeWidth="2" />
          <circle cx="30" cy="102" r="14" fill="#22c55e" stroke="#166534" strokeWidth="2" />
        </svg>
      );

    case 'sign-interstate-shield':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={`drop-shadow-md select-none ${className}`}
        >
          <path
            d="M 12,18 C 12,14 18,10 50,10 C 82,10 88,14 88,18 C 88,60 50,90 50,90 C 50,90 12,60 12,18 Z"
            fill="#1d4ed8"
            stroke="#ffffff"
            strokeWidth="3.5"
          />
          <path
            d="M 12,18 C 12,14 18,10 50,10 C 82,10 88,14 88,18 L 88,34 L 12,34 Z"
            fill="#dc2626"
          />
          <text
            x="50"
            y="26"
            fill="#ffffff"
            fontSize="8"
            fontWeight="900"
            fontFamily="Arial, sans-serif"
            textAnchor="middle"
            letterSpacing="0.5"
          >
            INTERSTATE
          </text>
          <text
            x="50"
            y="68"
            fill="#ffffff"
            fontSize="32"
            fontWeight="900"
            fontFamily="Arial, sans-serif"
            textAnchor="middle"
          >
            80
          </text>
        </svg>
      );

    case 'sign-hand-signals':
    case 'sign-hand-left':
      return (
        <svg
          width={size * 1.3}
          height={size * 0.9}
          viewBox="0 0 130 90"
          className={`drop-shadow-md select-none ${className}`}
        >
          <rect x="3" y="3" width="124" height="84" rx="8" fill="#f8fafc" stroke="#334155" strokeWidth="2.5" />
          {/* Car driver window with arm straight out (LEFT TURN) */}
          <rect x="40" y="24" width="55" height="42" rx="4" fill="#3b82f6" />
          {/* Driver head */}
          <circle cx="58" cy="40" r="7" fill="#1e293b" />
          {/* Arm extending straight out horizontally */}
          <line x1="52" y1="46" x2="16" y2="46" stroke="#f59e0b" strokeWidth="5" strokeLinecap="round" />
          <circle cx="14" cy="46" r="3" fill="#f59e0b" />
          <text x="65" y="80" fill="#0f172a" fontSize="9" fontWeight="900" textAnchor="middle">
            GIRO A LA IZQUIERDA
          </text>
        </svg>
      );

    case 'sign-school-bus-stop':
      return (
        <svg
          width={size * 1.4}
          height={size * 0.9}
          viewBox="0 0 140 90"
          className={`drop-shadow-md select-none ${className}`}
        >
          <rect x="2" y="2" width="136" height="86" rx="8" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" />
          {/* School bus yellow body */}
          <rect x="45" y="16" width="70" height="34" rx="4" fill="#eab308" stroke="#000000" strokeWidth="2" />
          {/* Windows */}
          <rect x="52" y="22" width="10" height="8" fill="#38bdf8" />
          <rect x="66" y="22" width="10" height="8" fill="#38bdf8" />
          <rect x="80" y="22" width="10" height="8" fill="#38bdf8" />
          <rect x="94" y="22" width="12" height="10" fill="#38bdf8" />
          {/* Wheels */}
          <circle cx="62" cy="50" r="6" fill="#000000" />
          <circle cx="98" cy="50" r="6" fill="#000000" />
          {/* Stop Arm extended with red light */}
          <rect x="33" y="26" width="12" height="8" fill="#dc2626" />
          <circle cx="39" cy="22" r="3.5" fill="#ef4444" className="animate-ping" />
          <text x="70" y="74" fill="#854d0e" fontSize="9" fontWeight="900" textAnchor="middle">
            DISTANCIA MÍNIMA: 10 PIES
          </text>
        </svg>
      );

    case 'sign-pavement-double-yellow':
      return (
        <svg
          width={size * 1.4}
          height={size * 0.8}
          viewBox="0 0 140 80"
          className={`drop-shadow-md select-none ${className}`}
        >
          {/* Road asphalt */}
          <rect x="2" y="2" width="136" height="76" rx="6" fill="#334155" />
          {/* Double solid yellow lines */}
          <line x1="10" y1="37" x2="130" y2="37" stroke="#facc15" strokeWidth="3" />
          <line x1="10" y1="43" x2="130" y2="43" stroke="#facc15" strokeWidth="3" />
          {/* White side edge lines */}
          <line x1="10" y1="12" x2="130" y2="12" stroke="#ffffff" strokeWidth="2.5" />
          <line x1="10" y1="68" x2="130" y2="68" stroke="#ffffff" strokeWidth="2.5" />
          <text x="70" y="26" fill="#f8fafc" fontSize="8" fontWeight="800" textAnchor="middle">
            NO REBASAR (AMBOS LADOS)
          </text>
        </svg>
      );

    case 'sign-skid-recovery':
      return (
        <svg
          width={size * 1.3}
          height={size * 0.9}
          viewBox="0 0 130 90"
          className={`drop-shadow-md select-none ${className}`}
        >
          <rect x="2" y="2" width="126" height="86" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="2" />
          {/* Car skidding to left */}
          <g transform="translate(65, 45) rotate(-22)">
            <rect x="-16" y="-24" width="32" height="48" rx="6" fill="#38bdf8" stroke="#ffffff" strokeWidth="2" />
          </g>
          {/* Steer curved arrow to left */}
          <path
            d="M 85,25 C 65,15 45,20 30,35"
            fill="none"
            stroke="#22c55e"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <polygon points="26,38 30,26 40,32" fill="#22c55e" />
          <text x="65" y="78" fill="#f8fafc" fontSize="8" fontWeight="800" textAnchor="middle">
            GIRAR VOLANTE EN DIRECCIÓN DEL DERRAPE
          </text>
        </svg>
      );

    case 'sign-bike-passing-4ft':
      return (
        <svg
          width={size * 1.1}
          height={size * 1.1}
          viewBox="0 0 100 100"
          className={`drop-shadow-md select-none ${className}`}
        >
          <rect
            x="4"
            y="4"
            width="92"
            height="92"
            rx="8"
            fill="#ffffff"
            stroke="#059669"
            strokeWidth="4"
          />
          <text
            x="50"
            y="26"
            fill="#059669"
            fontSize="18"
            fontWeight="900"
            fontFamily="Arial, sans-serif"
            textAnchor="middle"
          >
            4 PIES
          </text>
          <text
            x="50"
            y="42"
            fill="#0f172a"
            fontSize="10"
            fontWeight="800"
            fontFamily="Arial, sans-serif"
            textAnchor="middle"
          >
            MÍNIMO
          </text>
          <circle cx="34" cy="70" r="9" fill="none" stroke="#059669" strokeWidth="2.5" />
          <circle cx="66" cy="70" r="9" fill="none" stroke="#059669" strokeWidth="2.5" />
          <path
            d="M 34,70 L 46,55 L 60,55 L 66,70 M 46,55 L 52,70 L 40,70"
            fill="none"
            stroke="#059669"
            strokeWidth="2.5"
          />
        </svg>
      );

    default:
      return (
        <div
          style={{ width: size, height: size }}
          className="flex items-center justify-center bg-amber-400 text-slate-900 border-4 border-slate-900 rounded-xl font-black text-xs text-center p-2 shadow-md"
        >
          {signId.replace('sign-', '').toUpperCase()}
        </div>
      );
  }
};
