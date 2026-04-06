import {
  BusinessCenterRounded,
  ComputerRounded,
  ElectricalServicesRounded,
  SchoolRounded,
} from "@mui/icons-material";
import type { Jurusan } from "@/libs/types/mahasiswa";

export const JURUSAN_LIST: Jurusan[] = [
  "Informatika",
  "Sistem Informasi",
  "Teknik Elektro",
  "Manajemen",
];

export function getJurusanColorHex(jurusan: Jurusan): string {
  const map: Record<Jurusan, string> = {
    Informatika: "#1976d2",
    "Sistem Informasi": "#388e3c",
    "Teknik Elektro": "#f57c00",
    Manajemen: "#7b1fa2",
  };
  return map[jurusan];
}

export function getJurusanColorMui(
  jurusan: Jurusan,
): "primary" | "success" | "warning" | "secondary" {
  const map: Record<Jurusan, "primary" | "success" | "warning" | "secondary"> =
    {
      Informatika: "primary",
      "Sistem Informasi": "success",
      "Teknik Elektro": "warning",
      Manajemen: "secondary",
    };
  return map[jurusan];
}

export function getJurusanIcon(jurusan: Jurusan): React.ReactNode {
  const map: Record<Jurusan, React.ReactNode> = {
    Informatika: <ComputerRounded />,
    "Sistem Informasi": <SchoolRounded />,
    "Teknik Elektro": <ElectricalServicesRounded />,
    Manajemen: <BusinessCenterRounded />,
  };
  return map[jurusan];
}
