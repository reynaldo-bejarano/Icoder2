import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Define styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e2e8f0",
    fontSize: 8,
  },
  section: {
    backgroundColor: "#e2e8f0",
    margin: 10,
    padding: 10,
    borderRadius: 6,
  },
  header: {
    backgroundColor: "#1e293b",
    padding: 5,
    borderRadius: 0,
  },
  headerText: {
    color: "#ffffff",
    fontSize: 8,
    fontWeight: "bold",
    textTransform: "capitalize",
    textAlign: "center",
  },
  infoGrid: {
    marginTop: 10,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  infoValue: {
    backgroundColor: "#f1f5f9",
    padding: 5,
    borderRadius: 4,
    fontSize: 8,
    textTransform: "capitalize",
  },
  morphologicalGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  morphologicalBlock: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    width: "48%",
  },
  blockTitle: {
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 0,
  },
  card: {
    backgroundColor: "#1e293b", //#2296bd
    borderWidth: 1,
    borderColor: "#1e293b",
    borderRadius: 0,
    flex: 1,
    margin: 5,
    padding: 5,
  },
  day: {
    backgroundColor: "#1e293b", //#e2e8f0
    color: "#ffffff",
    textAlign: "center",
    paddingVertical: 5,
    borderRadius: 0,
    marginBottom: 0,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  mealContainer: {
    marginBottom: 0,
    textAlign: "center",
    flex: 1,
    justifyContent: "center",
  },
  mealTitle: {
    fontWeight: "bold",
    fontSize: 8,
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
    marginBottom: 0,
    textTransform: "capitalize",
    backgroundColor: "#2596be",
    color: "white",
    paddingVertical: 3,
  },

  textArea: {
    borderRadius: 0,
    gap: 2,
    padding: 10,
    height: 100,
    textAlignVertical: "top",
    fontStyle: "italic",
    backgroundColor: "#e2e8f0",
  },
});

function PDFNutrition({ formularioData }: any) {
  return (
    <Document>
      {/* Segunda Pagina */}

      <Page>
        <View style={styles.container}>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.headerText}>Plan nutricional</Text>
            </View>

            {formularioData.map((i: any) => (
              <View key={Math.random()}>
                {/* Lunes */}
                <Text style={styles.day}> {i[1].day}</Text>
                <View style={styles.grid}>
                  <View style={styles.mealContainer}>
                    <Text style={styles.mealTitle}>Desayuno</Text>
                    <Text style={styles.textArea}>{i[1].breakfast}</Text>
                  </View>
                  <View style={styles.mealContainer}>
                    <Text style={styles.mealTitle}>Merienda</Text>
                    <Text style={styles.textArea}>{i[1].merienda}</Text>
                  </View>
                  <View style={styles.mealContainer}>
                    <Text style={styles.mealTitle}>Almuerzo</Text>
                    <Text style={styles.textArea}>{i[1].lunch}</Text>
                  </View>
                  <View style={styles.mealContainer}>
                    <Text style={styles.mealTitle}>Snack</Text>
                    <Text style={styles.textArea}>{i[1].snack}</Text>
                  </View>
                  <View style={styles.mealContainer}>
                    <Text style={styles.mealTitle}>Cena</Text>
                    <Text style={styles.textArea}>{i[1].dinner}</Text>
                  </View>
                </View>
                {/* Lunes */}

                {/* Martes */}
                <Text style={styles.day}> {i[2].day}</Text>
                <View style={styles.grid}>
                  <View style={styles.mealContainer}>
                    <Text style={styles.mealTitle}>Desayuno</Text>
                    <Text style={styles.textArea}>{i[2].breakfast}</Text>
                  </View>
                  <View style={styles.mealContainer}>
                    <Text style={styles.mealTitle}>Merienda</Text>
                    <Text style={styles.textArea}>{i[2].merienda}</Text>
                  </View>
                  <View style={styles.mealContainer}>
                    <Text style={styles.mealTitle}>Almuerzo</Text>
                    <Text style={styles.textArea}>{i[2].lunch}</Text>
                  </View>
                  <View style={styles.mealContainer}>
                    <Text style={styles.mealTitle}>Snack</Text>
                    <Text style={styles.textArea}>{i[2].snack}</Text>
                  </View>
                  <View style={styles.mealContainer}>
                    <Text style={styles.mealTitle}>Cena</Text>
                    <Text style={styles.textArea}>{i[2].dinner}</Text>
                  </View>
                </View>
                {/* Martes */}

                {/* Miercoles */}
                <Text style={styles.day}> {i[3].day}</Text>
                <View style={styles.grid}>
                  <View style={styles.mealContainer}>
                    <Text style={styles.mealTitle}>Desayuno</Text>
                    <Text style={styles.textArea}>{i[3].breakfast}</Text>
                  </View>
                  <View style={styles.mealContainer}>
                    <Text style={styles.mealTitle}>Merienda</Text>
                    <Text style={styles.textArea}>{i[3].merienda}</Text>
                  </View>
                  <View style={styles.mealContainer}>
                    <Text style={styles.mealTitle}>Almuerzo</Text>
                    <Text style={styles.textArea}>{i[3].lunch}</Text>
                  </View>
                  <View style={styles.mealContainer}>
                    <Text style={styles.mealTitle}>Snack</Text>
                    <Text style={styles.textArea}>{i[3].snack}</Text>
                  </View>
                  <View style={styles.mealContainer}>
                    <Text style={styles.mealTitle}>Cena</Text>
                    <Text style={styles.textArea}>{i[3].dinner}</Text>
                  </View>
                </View>
                {/* Miercoles */}

                {/* Jueves */}
                <Text style={styles.day}> {i[4].day}</Text>
                <View style={styles.grid}>
                  <View style={styles.mealContainer}>
                    <Text style={styles.mealTitle}>Desayuno</Text>
                    <Text style={styles.textArea}>{i[4].breakfast}</Text>
                  </View>
                  <View style={styles.mealContainer}>
                    <Text style={styles.mealTitle}>Merienda</Text>
                    <Text style={styles.textArea}>{i[4].merienda}</Text>
                  </View>
                  <View style={styles.mealContainer}>
                    <Text style={styles.mealTitle}>Almuerzo</Text>
                    <Text style={styles.textArea}>{i[4].lunch}</Text>
                  </View>
                  <View style={styles.mealContainer}>
                    <Text style={styles.mealTitle}>Snack</Text>
                    <Text style={styles.textArea}>{i[4].snack}</Text>
                  </View>
                  <View style={styles.mealContainer}>
                    <Text style={styles.mealTitle}>Cena</Text>
                    <Text style={styles.textArea}>{i[4].dinner}</Text>
                  </View>
                </View>
                {/* Jueves */}

                {/* Viernes */}
                <Text style={styles.day}> {i[5].day}</Text>
                <View style={styles.grid}>
                  <View style={styles.mealContainer}>
                    <Text style={styles.mealTitle}>Desayuno</Text>
                    <Text style={styles.textArea}>{i[5].breakfast}</Text>
                  </View>
                  <View style={styles.mealContainer}>
                    <Text style={styles.mealTitle}>Merienda</Text>
                    <Text style={styles.textArea}>{i[5].merienda}</Text>
                  </View>
                  <View style={styles.mealContainer}>
                    <Text style={styles.mealTitle}>Almuerzo</Text>
                    <Text style={styles.textArea}>{i[5].lunch}</Text>
                  </View>
                  <View style={styles.mealContainer}>
                    <Text style={styles.mealTitle}>Snack</Text>
                    <Text style={styles.textArea}>{i[5].snack}</Text>
                  </View>
                  <View style={styles.mealContainer}>
                    <Text style={styles.mealTitle}>Cena</Text>
                    <Text style={styles.textArea}>{i[5].dinner}</Text>
                  </View>
                </View>
                {/* Viernes */}
              </View>
            ))}
          </View>
        </View>
      </Page>
      {/* Segunda pagina */}

      {/* Segunda Pagina */}

      <Page>
        <View style={styles.container}>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.headerText}>Plan nutricional</Text>
            </View>

            {formularioData.map((i: any) => (
              <View key={Math.random()}>
                {/* Sabado */}
                <Text style={styles.day}> {i[6].day}</Text>
                <View style={styles.grid}>
                  <View style={styles.mealContainer}>
                    <Text style={styles.mealTitle}>Desayuno</Text>
                    <Text style={styles.textArea}>{i[6].breakfast}</Text>
                  </View>
                  <View style={styles.mealContainer}>
                    <Text style={styles.mealTitle}>Merienda</Text>
                    <Text style={styles.textArea}>{i[6].merienda}</Text>
                  </View>
                  <View style={styles.mealContainer}>
                    <Text style={styles.mealTitle}>Almuerzo</Text>
                    <Text style={styles.textArea}>{i[6].lunch}</Text>
                  </View>
                  <View style={styles.mealContainer}>
                    <Text style={styles.mealTitle}>Snack</Text>
                    <Text style={styles.textArea}>{i[6].snack}</Text>
                  </View>
                  <View style={styles.mealContainer}>
                    <Text style={styles.mealTitle}>Cena</Text>
                    <Text style={styles.textArea}>{i[6].dinner}</Text>
                  </View>
                </View>
                {/* Sabado */}
              </View>
            ))}
          </View>
        </View>
      </Page>
      {/* Segunda pagina */}
    </Document>
  );
}

export default PDFNutrition;
