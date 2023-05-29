import MUIDataTable from "mui-datatables";
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "./memberTableStyle";

const MemberTable = ({title, data, options, columns}) => {

    return (
        <ThemeProvider theme={theme}>
            <MUIDataTable
                title={title}
                data={data}
                options={options}
                columns={columns}
            />
        </ThemeProvider>
    );
}

export default MemberTable;