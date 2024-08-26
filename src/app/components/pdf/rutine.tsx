
import { gruposIDS } from '@/libs/gruposIDS';
import { gruposMusculares } from '@/libs/gruposMusculares';
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { useParams } from 'next/navigation';




const RutineTable = ({ rutineData, id }: any) => {
    const athleteID = useParams();


    return (
        <Document>
            <Page>

                {/* titulo */}
                <View style={styles.container}>

                    <View style={styles.header}>
                        <Text style={styles.headerText}>Rutina de ejercicios - {id}</Text>
                    </View>

                    {/* Dias */}
                    <View >
                        <View style={styles.Subheader}>
                            <Text style={styles.headerSubText}>Días de entrenamiento</Text>
                        </View>
                    </View>
                    <View >
                        {
                            gruposMusculares.map((g) => (
                                <View style={styles.groupDayContainer} key={Math.random()}>
                                    <View style={styles.groupDayTitle}>
                                        <Text style={styles.groupTitleText}>{g.grupo || "Cargando"}</Text>
                                    </View>
                                    <View >

                                        <View key={Math.random()}>
                                            {rutineData.map((item: any) => {

                                                return (
                                                    <View
                                                        style={[styles.dayContainer]}
                                                        key={Math.random()}
                                                    >
                                                        <View style={styles.dayContent}>
                                                            <Text style={styles.dayText}>{item[g.grupo].lunes ? "Lunes" : ""}</Text>
                                                        </View>
                                                        <View style={styles.dayContent}>
                                                            <Text style={styles.dayText}>{item[g.grupo].martes ? "Martes" : ""}</Text>
                                                        </View>
                                                        <View style={styles.dayContent}>
                                                            <Text style={styles.dayText}>{item[g.grupo].miercoles ? "Miércoles" : ""}</Text>
                                                        </View>
                                                        <View style={styles.dayContent}>
                                                            <Text style={styles.dayText}>{item[g.grupo].jueves ? "Jueves" : ""}</Text>
                                                        </View>
                                                        <View style={styles.dayContent}>
                                                            <Text style={styles.dayText}>{item[g.grupo].viernes ? "Viernes" : ""}</Text>
                                                        </View>
                                                        <View style={styles.dayContent}>
                                                            <Text style={styles.dayText}>{item[g.grupo].sabado ? "Sábado" : ""}</Text>
                                                        </View>
                                                    </View>
                                                );
                                            })}
                                        </View>

                                    </View>
                                </View>
                            ))
                        }
                    </View>
                    {/* Dias */}


                    {/* Ejercicios */}
                    <View style={styles.Subheader}>
                        <Text style={styles.headerSubText}>Plan de entrenamiento</Text>
                    </View>
                    {
                        gruposMusculares.map((g) => (
                            <View style={styles.groupContainer} key={Math.random()}>
                                <View style={styles.groupTitle}>
                                    <Text style={styles.groupTitleText}>{g.grupo || "Cargando"}</Text>
                                </View>
                                <View >
                                    {gruposIDS.map((i) => (
                                        <View style={styles.exercisesContainer} key={Math.random()}>
                                            {rutineData.map((item: any) => {
                                                if (g.grupo === item[i.id]?.musculo && item[i.id].active === true) {
                                                    return (
                                                        <View
                                                            style={[styles.exerciseContainer]}
                                                            key={item[i.id]?.id}
                                                        >
                                                            <View style={styles.exerciseContent}>
                                                                <Text style={styles.exerciseText}>{item[i.id]?.ejercicio}</Text>
                                                            </View>

                                                            <View style={styles.detailsContainer}>
                                                                <Text style={styles.detailsText}>
                                                                    {item[i.id]?.serie} x {item[i.id]?.reps}
                                                                </Text>
                                                            </View>

                                                        </View>
                                                    );
                                                }
                                                return null;
                                            })}
                                        </View>
                                    ))}
                                </View>


                            </View>
                        ))
                    }
                </View>
            </Page>


        </Document>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f5f9', // bg-slate-200
        padding: 16,
    },
    header: {
        backgroundColor: '#1e293b', // bg-slate-900
        padding: 5,
        marginBottom: 16,
    },
    Subheader: {
        marginVertical: 10,
    },
    headerText: {
        color: '#f1f5f9', // text-slate-100
        fontSize: 10,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    headerSubText: {
        color: 'black', // text-slate-100
        fontSize: 10,
        textAlign: 'left',
        fontWeight: 'bold',
    },
    groupContainer: {
        backgroundColor: '#e2e8f0', // bg-slate-300
        marginBottom: 10,
    },
    groupTitle: {
        backgroundColor: '#49566c', // bg-slate-700
        paddingHorizontal: 8,
        paddingVertical: 4,
        textTransform: 'capitalize'
    },
    groupTitleText: {
        color: '#f1f5f9', // text-slate-100
        fontSize: 8,
    },
    exercisesContainer: {
        padding: 0,
    },
    exerciseContainer: {
        borderBottom: 1,
        borderBottomColor: '#f1f5f9',
        flexDirection: 'row',       // Alinea los elementos hijos en una fila
        alignItems: 'center',           // Alinea verticalmente los elementos al centro
        padding: 5,                    // Espacio interno alrededor del contenedor              // Espacio vertical entre los contenedores
        backgroundColor: '#e2e8f0',     // Fondo del contenedor (puedes cambiar el color según tu diseño)
    },
    exerciseContent: {
        flex: 7,
        padding: 0,
        fontSize: 8
    },
    exerciseText: {
        fontSize: 8,
        flex: 3,
        justifyContent: 'flex-start'
    },
    detailsContainer: {
        padding: 0,
        borderRadius: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        marginTop: 4,
    },
    detailsText: {
        fontSize: 8,
    },
    hidden: {
        display: 'none',
    },
    activeDay: {
        backgroundColor: 'green',
        height: 3,
        width: 3,
        color: 'pink'
    },
    inactiveDay: {
        backgroundColor: 'black',
        height: 3,
        width: 3,
    },
    groupDayContainer: {
        backgroundColor: '#e2e8f0', // bg-slate-300
        marginBottom: 1,
    },
    dayContainer: {
        borderBottom: 1,
        borderBottomColor: '#f1f5f9',
        flexDirection: 'row',       // Alinea los elementos hijos en una fila
        alignItems: 'center',           // Alinea verticalmente los elementos al centro
        padding: 0,                    // Espacio interno alrededor del contenedor              // Espacio vertical entre los contenedores
        backgroundColor: '#e2e8f0',
        marginBottom: 0,
        justifyContent: 'space-between',
        gap: 2 // Fondo del contenedor (puedes cambiar el color según tu diseño)
    },
    dayContent: {
        paddingVertical: 2,
        paddingHorizontal: 8,
        fontSize: 8,
        flex: 1
    },
    dayText: {
        fontSize: 8,
        paddingVertical: 2,
    },
    groupDayTitle: {
        backgroundColor: '#49566c', // bg-slate-700
        paddingHorizontal: 8,
        paddingVertical: 2,
        textTransform: 'capitalize'
    },
});

export default RutineTable;
