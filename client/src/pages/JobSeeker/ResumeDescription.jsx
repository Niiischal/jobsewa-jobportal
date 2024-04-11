import { Button, message } from "antd";
import jsPDF from "jspdf";
import React, { useEffect, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetResume } from "../../apicalls/resumes";
import { SetLoader } from "../../redux/loadersSlice";

function ResumeDescription() {
  const [resume, setResume] = useState(null);
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetResume({
        jobSeeker: user._id,
      });
      dispatch(SetLoader(false));
      if (response.success && response.data.length > 0) {
        setResume(response.data[0]);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDownloadPDF = () => {
    if (!resume) {
      message.error(
        "Resume data is not available yet. Please try again later."
      );
      return;
    }

    const doc = new jsPDF();
    let y = 10; // Starting Y position

    // Helper function for adding add new page if needed
    const addNewPageIfNeeded = () => {
      if (y > 280) {
        doc.addPage();
        y = 10; 
      }
    };

    doc.setFontSize(18);
    doc.setFont(undefined, "bold");
    y += 10;

    const addSectionHeader = (header) => {
      addNewPageIfNeeded();
      doc.setFontSize(12);
      doc.setFont(undefined, "bold");
      doc.text(header, 14, y);
      y += 5;
    };

    const addSectionContent = (contentArray) => {
      doc.setFontSize(10);
      doc.setFont(undefined, "normal");
      contentArray.forEach((content) => {
        doc.text(content, 14, y);
        y += 5;
      });
      y += 20; 
    };

    addSectionHeader("Personal Information");
    addSectionContent([
      `Name: ${resume.name}`,
      `Email: ${resume.email}`,
      `Location: ${resume.location}`,
      `Contact Number: ${resume.contact}`,
      `About Me: ${resume.about}`,
    ]);

    addSectionHeader("Education");
    resume.education.forEach((edu) => {
      addSectionContent([
        `Degree: ${edu.degree}`,
        `Institution: ${edu.institution}`,
        `Start Year - End Year: ${edu.startYear} - ${edu.endYear}`,
      ]);
    });

    addSectionHeader("Experience");
    resume.experience.forEach((exp) => {
      addSectionContent([
        `Title: ${exp.title}`,
        `Company: ${exp.company}`,
        `Start Date - End Date: ${exp.startDate} - ${exp.endDate}`,
        `Description: ${exp.description}`,
      ]);
    });

    addSectionHeader("Projects");
    resume.projects.forEach((project) => {
      addSectionContent([
        `Title: ${project.title}`,
        `Description: ${project.description}`,
        `Start Date - End Date: ${project.startDate} - ${project.endDate}`,
        `Link: ${project.link}`,
      ]);
    });

    addSectionHeader("Certificates");
    resume.certificates.forEach((certificate) => {
      addSectionContent([
        `Title: ${certificate.title}`,
        `Organization: ${certificate.organization}`,
        `Date: ${certificate.date}`,
        `Link: ${certificate.link}`,
      ]);
    });

    addSectionHeader("Technical Skills");
    addSectionContent([resume.technicalSkills]);

    addSectionHeader("Soft Skills");
    addSectionContent([resume.softSkills]);

    doc.save(`${user.name}.pdf`);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between mb-3">
        <Button type="primary" onClick={() => navigate("/resume")}>
          <IoArrowBackOutline size={18} />
        </Button>
        <Button type="primary" onClick={handleDownloadPDF}>
          Download Resume
        </Button>
      </div>
      {resume !== null ? (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            <div>
              <h2 className="text-xl font-semibold mb-2">
                Personal Information
              </h2>
              <p>
                <strong>Name:</strong> {resume.name}
              </p>
              <p>
                <strong>Email:</strong> {resume.email}
              </p>
              <p>
                <strong>Location:</strong> {resume.location}
              </p>
              <p>
                <strong>Contact Number:</strong> {resume.contact}
              </p>
              <p>
                <strong>About Me:</strong> {resume.about}
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Links</h2>
              <ul>
                {resume.links.map((link, index) => (
                  <li key={index}>
                    <a href={link} target="_blank" rel="noopener noreferrer">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
              <h2 className="text-xl font-semibold mb-2">Technical Skills</h2>
              <p>{resume.technicalSkills}</p>
              <h2 className="text-xl font-semibold mb-2">Soft Skills</h2>
              <p>{resume.softSkills}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            <div>
              <h2 className="text-xl font-semibold mb-2">Education</h2>
              {resume.education.map((edu, index) => (
                <div key={index}>
                  <p>
                    <strong>Degree:</strong> {edu.degree}
                  </p>
                  <p>
                    <strong>Institution:</strong> {edu.institution}
                  </p>
                  <p>
                    <strong>Start Year:</strong> {edu.startYear}
                  </p>
                  <p>
                    <strong>End Year:</strong> {edu.endYear}
                  </p>
                </div>
              ))}
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Experience</h2>
              {resume.experience.map((exp, index) => (
                <div key={index}>
                  <p>
                    <strong>Title:</strong> {exp.title}
                  </p>
                  <p>
                    <strong>Company:</strong> {exp.company}
                  </p>
                  <p>
                    <strong>Start Date:</strong> {exp.startDate}
                  </p>
                  <p>
                    <strong>End Date:</strong> {exp.endDate}
                  </p>
                  <p>
                    <strong>Description:</strong> {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            <div>
              <h2 className="text-xl font-semibold mb-2">Projects</h2>
              {resume.projects.map((project, index) => (
                <div key={index}>
                  <p>
                    <strong>Title:</strong> {project.title}
                  </p>
                  <p>
                    <strong>Description:</strong> {project.description}
                  </p>
                  <p>
                    <strong>Start Date:</strong> {project.startDate}
                  </p>
                  <p>
                    <strong>End Date:</strong> {project.endDate}
                  </p>
                  <p>
                    <strong>Link:</strong>{" "}
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {project.link}
                    </a>
                  </p>
                </div>
              ))}
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Certificates</h2>
              {resume.certificates.map((certificate, index) => (
                <div key={index}>
                  <p>
                    <strong>Title:</strong> {certificate.title}
                  </p>
                  <p>
                    <strong>Organization:</strong> {certificate.organization}
                  </p>
                  <p>
                    <strong>Date:</strong> {certificate.date}
                  </p>
                  <p>
                    <strong>Link:</strong>{" "}
                    <a
                      href={certificate.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {certificate.link}
                    </a>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p>Loading resume...</p>
      )}
    </div>
  );
}

export default ResumeDescription;
