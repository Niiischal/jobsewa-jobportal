import {
    Document,
    PDFViewer,
    Page,
    StyleSheet,
    Text,
    View,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 20,
    fontFamily: "Helvetica",
  },
  section: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  paragraph: {
    fontSize: 12,
    marginBottom: 5,
  },
});

function ResumePDF({ resume }) {
    if (!resume) {
        return <Text>No resume data provided</Text>;
      }
  return (
    <PDFViewer style={{ width: "100%", height: "100vh" }}>
      <Document>
        <Page size="A4">
          <View style={styles.container}>
            <View style={styles.section}>
              <Text style={styles.heading}>Personal Information</Text>
              <Text style={styles.paragraph}>
                <strong>Name:</strong> {resume.name}
              </Text>
              <Text style={styles.paragraph}>
                <strong>Email:</strong> {resume.email}
              </Text>
              <Text style={styles.paragraph}>
                <strong>Location:</strong> {resume.location}
              </Text>
              <Text style={styles.paragraph}>
                <strong>Contact Number:</strong> {resume.contact}
              </Text>
              <Text style={styles.paragraph}>
                <strong>About Me:</strong> {resume.about}
              </Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.heading}>Links</Text>
              {resume.links.map((link, index) => (
                <Text key={index} style={styles.paragraph}>
                  <strong>Link:</strong> {link}
                </Text>
              ))}
            </View>
            <View style={styles.section}>
              <Text style={styles.heading}>Technical Skills</Text>
              <Text style={styles.paragraph}>{resume.technicalSkills}</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.heading}>Soft Skills</Text>
              <Text style={styles.paragraph}>{resume.softSkills}</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.heading}>Education</Text>
              {resume.education.map((edu, index) => (
                <View key={index} style={styles.paragraph}>
                  <Text>
                    <strong>Degree:</strong> {edu.degree}
                  </Text>
                  <Text>
                    <strong>Institution:</strong> {edu.institution}
                  </Text>
                  <Text>
                    <strong>Start Year:</strong> {edu.startYear}
                  </Text>
                  <Text>
                    <strong>End Year:</strong> {edu.endYear}
                  </Text>
                </View>
              ))}
            </View>
            <View style={styles.section}>
              <Text style={styles.heading}>Experience</Text>
              {resume.experience.map((exp, index) => (
                <View key={index} style={styles.paragraph}>
                  <Text>
                    <strong>Title:</strong> {exp.title}
                  </Text>
                  <Text>
                    <strong>Company:</strong> {exp.company}
                  </Text>
                  <Text>
                    <strong>Start Date:</strong> {exp.startDate}
                  </Text>
                  <Text>
                    <strong>End Date:</strong> {exp.endDate}
                  </Text>
                  <Text>
                    <strong>Description:</strong> {exp.description}
                  </Text>
                </View>
              ))}
            </View>
            <View style={styles.section}>
              <Text style={styles.heading}>Projects</Text>
              {resume.projects.map((project, index) => (
                <View key={index} style={styles.paragraph}>
                  <Text>
                    <strong>Title:</strong> {project.title}
                  </Text>
                  <Text>
                    <strong>Description:</strong> {project.description}
                  </Text>
                  <Text>
                    <strong>Start Date:</strong> {project.startDate}
                  </Text>
                  <Text>
                    <strong>End Date:</strong> {project.endDate}
                  </Text>
                  <Text>
                    <strong>Link:</strong> {project.link}
                  </Text>
                </View>
              ))}
            </View>
            <View style={styles.section}>
              <Text style={styles.heading}>Certificates</Text>
              {resume.certificates.map((certificate, index) => (
                <View key={index} style={styles.paragraph}>
                  <Text>
                    <strong>Title:</strong> {certificate.title}
                  </Text>
                  <Text>
                    <strong>Organization:</strong> {certificate.organization}
                  </Text>
                  <Text>
                    <strong>Date:</strong> {certificate.date}
                  </Text>
                  <Text>
                    <strong>Link:</strong> {certificate.link}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}

export default ResumePDF;
