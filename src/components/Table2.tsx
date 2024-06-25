import { Table } from "@mantine/core";

import dataset from "../data/Manufac  India Agro Dataset.json";
import type { DatasetRow } from "../components/type";

interface Table2 {
  [cropName: string]: {
    cropName: string;
    totalYield: number;
    totalCultivation: number;
    totalEntries: number;
  };
}

export default function Table2() {
  const result = dataset.reduce((acc, row: DatasetRow) => {
    const year = Number(row.Year.toString().slice(-4));
    const cropName = row["Crop Name"];
    const cropYield =
      Number(row["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"]) || 0;
    const cropCultivation =
      Number(row["Area Under Cultivation (UOM:Ha(Hectares))"]) || 0;

    if (!acc[cropName] && year >= 1950) {
      acc[cropName] = {
        cropName: cropName,
        totalYield: cropYield,
        totalCultivation: cropCultivation,
        totalEntries: 1,
      };
    } else if (year >= 1950) {
      acc[cropName].totalYield += cropYield;
      acc[cropName].totalCultivation += cropCultivation;
      acc[cropName].totalEntries += 1;
    }
    return acc;
  }, {} as Table2);

  const rows = Object.values(result).map((element) => (
    <Table.Tr key={element.cropName}>
      <Table.Td>{element.cropName}</Table.Td>
      <Table.Td>
        {(element.totalYield / element.totalEntries).toFixed(3)}
      </Table.Td>
      <Table.Td>
        {(element.totalCultivation / element.totalEntries).toFixed(3)}
      </Table.Td>
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
            <Table.Th>Crop</Table.Th>
            <Table.Th>Average Yield of the Crop between 1950-2020</Table.Th>
            <Table.Th>
              Average Cultivation Area of the Crop between 1950-2020
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
