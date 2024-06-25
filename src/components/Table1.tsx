import { Table } from "@mantine/core";
import dataset from "../data/Manufac  India Agro Dataset.json";

interface Table1 {
  [year: string]: {
    max: number;
    min: number;
    year: string;
    maxCropName: string;
    minCropName: string;
  };
}

export default function Table1() {
  const result = dataset.reduce((acc, row) => {
    const year = row.Year.toString().slice(-4);
    if (!acc[year]) {
      acc[year] = {
        max: Number(row["Crop Production (UOM:t(Tonnes))"]) || 0,
        min: Number(row["Crop Production (UOM:t(Tonnes))"]) || 0,
        year: year,
        maxCropName: row["Crop Name"],
        minCropName: row["Crop Name"],
      };
    } else {
      const currentYear = acc[year];
      const currentProduction = Number(row["Crop Production (UOM:t(Tonnes))"]);
      if (currentProduction > currentYear.max) {
        acc[year].max = currentProduction;
        acc[year].maxCropName = row["Crop Name"];
      }
      if (currentProduction < currentYear.min) {
        acc[year].min = currentProduction;
        acc[year].minCropName = row["Crop Name"];
      }
    }
    return acc;
  }, {} as Table1);

  const rows = Object.values(result).map((element) => (
    <Table.Tr key={element.year}>
      <Table.Td>{element.year}</Table.Td>
      <Table.Td>{element.maxCropName}</Table.Td>
      <Table.Td>{element.minCropName}</Table.Td>
    </Table.Tr>
  ));
  return (
    <Table.ScrollContainer minWidth={500}>
      <Table
        stickyHeader
        stickyHeaderOffset={0}
        striped
        highlightOnHover
        withTableBorder
        withColumnBorders
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Year</Table.Th>
            <Table.Th>Crop with Maximum Production in that Year</Table.Th>
            <Table.Th>Crop with Minimum Production in that Year</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
