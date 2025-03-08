import { TableHead, TableRow, TableCell } from "@mui/material"


const TableHeadWrapper = ({ head }: { head: string[] }) => {
    return (
        <TableHead>
            <TableRow>
                {
                    head.map((item, index) => (
                        <TableCell key={index}>{item}</TableCell>
                    ))
                }
                <TableCell align="right" />
            </TableRow>
        </TableHead>
    )
}

export default TableHeadWrapper