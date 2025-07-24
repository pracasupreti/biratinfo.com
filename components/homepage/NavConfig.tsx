import { ReactNode } from "react";

// components/navConfig.ts
export interface NavItem {
  name: string | ReactNode;
  path: string;
}

export const navConfig: NavItem[] = [
  { name: "होमपेज", path: "/" },
  { name: "राजनीति", path: "/politics" },
  { name: "प्रविधि", path: "/technology" },
  { name: "साहित्य", path: "/literature" },
  { name: "अर्थ", path: "/economy" },
  { name: "सम्पादकीय", path: "/editorial" },
  { name: "बिचार", path: "/opinion" },
  { name: "खेलकुद", path: "/sports" },
  { name: "रोजगार", path: "/employment" },
  { name: "मनोरंजन", path: "/entertainment" },
  { name: "सुरक्षा", path: "/security" },
  { name: "अन्य", path: "/others" },
];

export const othersDropdownConfig = [
  { name: 'पर्यटन', path: '/tourism' },
  { name: 'स्वास्थ्य', path: '/health' },
  { name: 'शिक्षा', path: '/education' },
  { name: 'अन्तराष्ट्रिय', path: '/international' }
];

export const mobileNav = [
  { name: "होमपेज", path: "/" },
  { name: "राजनीति", path: "/politics" },
  { name: "प्रविधि", path: "/technology" },
  { name: "साहित्य", path: "/literature" },
  { name: "अर्थ", path: "/economy" },
  { name: "सम्पादकीय", path: "/editorial" },
  { name: "बिचार", path: "/opinion" },
  { name: "खेलकुद", path: "/sports" },
  { name: "रोजगार", path: "/employment" },
  { name: "मनोरंजन", path: "/entertainment" },
  { name: "सुरक्षा", path: "/security" },
  { name: 'पर्यटन', path: '/tourism' },
  { name: 'स्वास्थ्य', path: '/health' },
  { name: 'शिक्षा', path: '/education' },
  { name: 'अन्तराष्ट्रिय', path: '/international' },
];