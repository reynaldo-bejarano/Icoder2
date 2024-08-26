import calcularEdad from "@/hooks/calculateAge";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";



// Define styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        fontSize: 8
    },
    section: {
        backgroundColor: '#e2e8f0',
        margin: 10,
        padding: 10,
        borderRadius: 6,
    },
    header: {
        backgroundColor: '#1e293b',
        padding: 5,
        borderRadius: 0,
    },
    headerText: {
        color: '#ffffff',
        fontSize: 8,
        fontWeight: 'bold',
        textTransform: 'capitalize',
        textAlign: 'center'
    },
    infoGrid: {
        marginTop: 10,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
        backgroundColor: '#f1f5f9',
        marginBottom: 2,
        alignItems: 'center',
        paddingHorizontal: 5
    },
    infoValue: {
        backgroundColor: '#f1f5f9',
        padding: 5,
        fontSize: 8,
        textTransform: "capitalize",
    },
    morphologicalGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    morphologicalBlock: {

        padding: 10,
        marginVertical: 5,
        borderRadius: 8,
        width: '48%', // Adjust width for two columns
    },
    blockTitle: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 10,
    },




});

function PDFProfile({ athleteData, morphologicalData, cantonData, distritoData, sportData, modalityData }: any) {



    return (
        <Document>
            {/* Primera Pagina */}
            <Page >
                <View style={styles.container}>
                    {/* Datos personales */}
                    <View style={styles.section}>

                        <View style={styles.header}>
                            <Text style={styles.headerText}>ICODER - Reporte General</Text>
                        </View>
                        <View style={styles.morphologicalGrid}>
                            {/* Basico */}
                            <View style={styles.morphologicalBlock}>
                                <View style={styles.header}>
                                    <Text style={styles.headerText}>Información</Text>
                                </View>
                                <View style={styles.infoGrid}>
                                    <View style={styles.infoRow}>
                                        <Text>Identificación</Text>
                                        <Text style={styles.infoValue}>{athleteData?.identification || "Cargando"}</Text>
                                    </View>
                                    <View style={styles.infoRow}>
                                        <Text>Edad</Text>
                                        <Text style={styles.infoValue}>{athleteData?.birth ? calcularEdad(athleteData?.birth) : "Cargando"}</Text>
                                    </View>
                                    <View style={styles.infoRow}>
                                        <Text>Género</Text>
                                        <Text style={styles.infoValue}>{athleteData?.genre || "Cargando"}</Text>
                                    </View>
                                    <View style={styles.infoRow}>
                                        <Text>Nombre</Text>
                                        <Text style={styles.infoValue}>{athleteData?.name || "Cargando"}</Text>
                                    </View>
                                    <View style={styles.infoRow}>
                                        <Text>Primer Apellido</Text>
                                        <Text style={styles.infoValue}>{athleteData?.lastname1 || "Cargando"}</Text>
                                    </View>
                                    <View style={styles.infoRow}>
                                        <Text>Segundo Apellido</Text>
                                        <Text style={styles.infoValue}>{athleteData?.lastname2 || "Cargando"}</Text>
                                    </View>
                                    <View style={styles.infoRow}>
                                        <Text>Email</Text>
                                        <Text style={styles.infoValue}>{athleteData?.email || "Cargando"}</Text>
                                    </View>
                                    <View style={styles.infoRow}>
                                        <Text>Teléfono</Text>
                                        <Text style={styles.infoValue}>{athleteData?.phone || "Cargando"}</Text>
                                    </View>

                                </View>
                            </View>
                            {/* Porcentaje */}
                            <View style={styles.morphologicalBlock}>
                                <View style={styles.header}>
                                    <Text style={styles.headerText}>Datos demográficos</Text>
                                </View>
                                <View style={styles.infoGrid}>
                                    <View style={styles.infoRow}>
                                        <Text>Provincia</Text>
                                        <Text style={styles.infoValue}>{athleteData?.address?.provincia_id || "Cargando"}</Text>
                                    </View>
                                    <View style={styles.infoRow}>
                                        <Text>Cantón</Text>
                                        <Text style={styles.infoValue}>{cantonData?.nombre || "Cargando..."}</Text>
                                    </View>
                                    <View style={styles.infoRow}>
                                        <Text>Distrito</Text>
                                        <Text style={styles.infoValue}>{distritoData?.nombre || "Cargando..."}</Text>
                                    </View>
                                </View>

                                <View style={styles.header}>
                                    <Text style={styles.headerText}>Actividad física</Text>
                                </View>
                                <View style={styles.infoGrid}>
                                    <View style={styles.infoRow}>
                                        <Text>Deporte</Text>
                                        <Text style={styles.infoValue}>{sportData?.name || "Cargando..."}</Text>
                                    </View>
                                    <View style={styles.infoRow}>
                                        <Text>Modalidad</Text>
                                        <Text style={styles.infoValue}>{modalityData?.name || "Cargando..."}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    {/* Datos personales */}


                    <View style={styles.container}>
                        {/* Morfología */}
                        <View style={styles.section}>
                            <View style={styles.header}>
                                <Text style={styles.headerText}>Datos morfológicos</Text>
                            </View>
                            <View style={styles.morphologicalGrid}>
                                {/* Basico */}
                                <View style={styles.morphologicalBlock}>
                                    <View style={styles.header}>
                                        <Text style={styles.headerText}>Básico</Text>
                                    </View>
                                    <View style={styles.infoGrid}>
                                        <View style={styles.infoRow}>
                                            <Text>Estatura</Text>
                                            <Text style={styles.infoValue}>{morphologicalData?.basic?.height || "0"} cm</Text>
                                        </View>
                                        <View style={styles.infoRow}>
                                            <Text>Peso</Text>
                                            <Text style={styles.infoValue}>{morphologicalData?.basic?.weight || "0"} kg</Text>
                                        </View>
                                        <View style={styles.infoRow}>
                                            <Text>IMC</Text>
                                            <Text style={styles.infoValue}>{morphologicalData?.basic?.IMC || "0"}</Text>
                                        </View>
                                    </View>
                                </View>
                                {/* Porcentaje */}
                                <View style={styles.morphologicalBlock}>
                                    <View style={styles.header}>
                                        <Text style={styles.headerText}>Porcentaje</Text>
                                    </View>
                                    <View style={styles.infoGrid}>
                                        <View style={styles.infoRow}>
                                            <Text>Grasa</Text>
                                            <Text style={styles.infoValue}>{morphologicalData?.percentage?.fat || "0"}%</Text>
                                        </View>
                                        <View style={styles.infoRow}>
                                            <Text>Musculo</Text>
                                            <Text style={styles.infoValue}>{morphologicalData?.percentage?.muscle || "0"}%</Text>
                                        </View>
                                        <View style={styles.infoRow}>
                                            <Text>Agua</Text>
                                            <Text style={styles.infoValue}>{morphologicalData?.percentage?.water || "0"}%</Text>
                                        </View>
                                    </View>
                                </View>
                                {/* Circunferencia */}
                                <View style={styles.morphologicalBlock}>
                                    <View style={styles.header}>
                                        <Text style={styles.headerText}>Circunferencia</Text>
                                    </View>
                                    <View style={styles.infoGrid}>
                                        <View style={styles.infoRow}>
                                            <Text>Cintura</Text>
                                            <Text style={styles.infoValue}>{morphologicalData?.circumference?.waist || "0"} cm</Text>
                                        </View>
                                        <View style={styles.infoRow}>
                                            <Text>Cadera</Text>
                                            <Text style={styles.infoValue}>{morphologicalData?.circumference?.hip || "0"} cm</Text>
                                        </View>
                                    </View>
                                </View>
                                {/* Brazo */}
                                <View style={styles.morphologicalBlock}>
                                    <View style={styles.header}>
                                        <Text style={styles.headerText}>Circunferencia Brazos</Text>
                                    </View>
                                    <View style={styles.infoGrid}>
                                        <View style={styles.infoRow}>
                                            <Text>Derecho</Text>
                                            <Text style={styles.infoValue}>{morphologicalData?.arms?.aright || "0"} cm</Text>
                                        </View>
                                        <View style={styles.infoRow}>
                                            <Text>Izquierdo</Text>
                                            <Text style={styles.infoValue}>{morphologicalData?.arms?.aleft || "0"} cm</Text>
                                        </View>
                                    </View>
                                </View>
                                {/* Pierna */}
                                <View style={styles.morphologicalBlock}>
                                    <View style={styles.header}>
                                        <Text style={styles.headerText}>Circunferencia Piernas</Text>
                                    </View>
                                    <View style={styles.infoGrid}>
                                        <View style={styles.infoRow}>
                                            <Text>Derecha</Text>
                                            <Text style={styles.infoValue}>{morphologicalData?.legs?.lright || "0"} cm</Text>
                                        </View>
                                        <View style={styles.infoRow}>
                                            <Text>Izquierda</Text>
                                            <Text style={styles.infoValue}>{morphologicalData?.legs?.lleft || "0"} cm</Text>
                                        </View>
                                    </View>
                                </View>
                                {/* Gastrocnemio */}
                                <View style={styles.morphologicalBlock}>
                                    <View style={styles.header}>
                                        <Text style={styles.headerText}>Gastrocnemio</Text>
                                    </View>
                                    <View style={styles.infoGrid}>
                                        <View style={styles.infoRow}>
                                            <Text>Derecho</Text>
                                            <Text style={styles.infoValue}>{morphologicalData?.gastrocnemius?.gright || "0"} cm</Text>
                                        </View>
                                        <View style={styles.infoRow}>
                                            <Text>Izquierdo</Text>
                                            <Text style={styles.infoValue}>{morphologicalData?.gastrocnemius?.gleft || "0"} cm</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {/* Morfología */}
                    </View>
                </View>
            </Page>


        </Document >
    );
}

export default PDFProfile;
