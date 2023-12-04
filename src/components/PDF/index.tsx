import React from 'react';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import { IPayslip } from '@/interfaces';

// Create styles
const styles = StyleSheet.create({
	page: {
		flexDirection: 'column',
		backgroundColor: '#fff',
		fontSize: 12,
	},
	section: {
		margin: 10,
		padding: 10,
		flexGrow: 1
	},
	container: {
		padding: 8,
	},
	header: {
		paddingBottom: 8,
	},
	title: {
		fontWeight: 'bold',
	},
	content: {
		paddingBottom: 8,
	},
	info: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 8,
	},
	bold: {
		fontWeight: 'bold',
	},
	separator: {
		borderBottomWidth: 1,
		borderBottomColor: 'black',
		marginVertical: 8,
	},
	employeeInfo: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 8,
	},
	table: {
		marginTop: 16,
	},
	tableRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderBottomWidth: 1,
		borderBottomColor: 'black',
		paddingVertical: 8,
	},
	tableHead: {
		flex: 1,
		fontWeight: 'bold',
	},
	tableCell: {
		flex: 1,
	},
	textRight: {
		textAlign: 'right',
	},
});

// Create Document Component
interface IPDF {
	payslip: IPayslip;
}

const getMonth = (date: Date) => {
	return new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(new Date(date)).toLowerCase();
}

export const PDF: React.FC<IPDF> = ({ payslip }) => (
	<Document>
		<Page size="A4" style={styles.page}>
			<View style={styles.section}>
				<View style={styles.header}>
					<Text style={styles.title}>Recibo de pagamento de salário</Text>
				</View>
				<View style={styles.content}>
					<View style={styles.info}>
						<Text>Período de referência:</Text>
						<Text style={styles.bold}>
							{payslip &&
								new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(new Date(payslip.dateOfIssue)) +
								'/' +
								new Date(payslip.dateOfIssue).getFullYear()}
						</Text>
					</View>
					<View style={styles.separator}></View>
					<View style={styles.employeeInfo}>
						<Text>Nome do colaborador: {payslip?.employee.name}</Text>
						<Text>Admissão: {payslip?.employee && new Date(payslip?.employee?.admissionDate).toLocaleDateString('pt-br')}</Text>
					</View>
					<Text>Função: {payslip?.employee.role.name}</Text>

					<View style={styles.table}>
						<View style={styles.tableRow}>
							<Text style={styles.tableHead}>Descrições</Text>
							<Text style={[styles.tableHead, styles.textRight]}>Proventos</Text>
							<Text style={[styles.tableHead, styles.textRight]}>Deduções</Text>
						</View>

						<View style={styles.tableRow}>
							<Text style={styles.tableCell}>Salário mensalista</Text>
							<Text style={[styles.tableCell, styles.textRight]}>{payslip?.grossSalary.toFixed(2).replace('.', ',')}</Text>
							<Text style={[styles.tableCell, styles.textRight]}></Text>
						</View>

						<View style={styles.tableRow}>
							<Text style={styles.tableCell}>Bónus</Text>
							<Text style={[styles.tableCell, styles.textRight]}>{payslip?.bonus.toFixed(2).replace('.', ',')}</Text>
							<Text style={[styles.tableCell, styles.textRight]}></Text>
						</View>

						<View style={styles.tableRow}>
							<Text style={styles.tableCell}>Descontos</Text>
							<Text style={[styles.tableCell, styles.textRight]}></Text>
							<Text style={[styles.tableCell, styles.textRight]}>{payslip?.discounts.toFixed(2).replace('.', ',')}</Text>
						</View>

						<View style={styles.tableRow}>
							<Text style={styles.tableCell}>INSS</Text>
							<Text style={[styles.tableCell, styles.textRight]}></Text>
							<Text style={[styles.tableCell, styles.textRight]}>{payslip?.inss.toFixed(2).replace('.', ',')}</Text>
						</View>

						<View style={styles.tableRow}>
							<Text style={styles.tableCell}>IRRF</Text>
							<Text style={[styles.tableCell, styles.textRight]}></Text>
							<Text style={[styles.tableCell, styles.textRight]}>{payslip?.irrf.toFixed(2).replace('.', ',')}</Text>
						</View>

						<View style={styles.tableRow}>
							<Text style={styles.tableCell}>Totais</Text>
							<Text style={[styles.tableCell, styles.textRight]}>{payslip && (payslip.grossSalary + payslip.bonus).toFixed(2).replace(".", ",")}</Text>
							<Text style={[styles.tableCell, styles.textRight]}>{payslip && (payslip.discounts + payslip.inss + payslip.irrf).toFixed(2).replace(".", ",")}</Text>
						</View>

						{/* Adicione mais linhas conforme necessário */}

						<View style={styles.tableRow}>
							<Text style={styles.tableCell}></Text>
							<Text style={[styles.tableCell, styles.textRight]}>Salário líquido</Text>
							<Text style={[styles.tableCell, styles.textRight, styles.bold]}>
								R$ {payslip && payslip.netSalary.toFixed(2).replace('.', ',')}
							</Text>
						</View>
					</View>
				</View>
			</View>
		</Page>
	</Document>
);

interface IButtonDownload {
	payslip: IPayslip;
	children?: React.ReactNode;
}

export const DownloadPDF: React.FC<IButtonDownload> = ({ payslip, children }) => (
	<PDFDownloadLink document={<PDF payslip={payslip} />} fileName={`holerite-${getMonth(payslip?.dateOfIssue)}.pdf`}>
		{({ blob, url, loading, error }) => (loading ? 'Carregando PDF...' : 'Baixar')}
	</PDFDownloadLink>
)