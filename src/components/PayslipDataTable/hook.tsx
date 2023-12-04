import React from "react";


export const usePayslipDataTable = () => {

	const [refresh, setRefresh] = React.useState(false);

	const onRefresh = () => {
		setRefresh((refresh)=> !refresh);
	}

	return {
		onRefresh,
		refresh,
	}
}