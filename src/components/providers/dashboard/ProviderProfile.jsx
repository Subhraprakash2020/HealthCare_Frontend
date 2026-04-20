import { useContext, useEffect, useState } from "react";
import {
  Alert,
  Card,
  Col,
  Container,
  Image as RBImage,
  Row,
  Spinner,
} from "react-bootstrap";
import axios from "axios";
import ProviderHeader from "./ProviderHeader";
import { ProviderProfileContext } from "./ProviderProfileContext";
import "../../../css/ProviderCustom.css";

const PROFILE_IMAGE_FALLBACK =
  "https://cdn-icons-png.flaticon.com/512/847/847969.png";

const formatValue = (value) => {
  if (value === null || value === undefined || value === "") {
    return "Not available";
  }

  if (Array.isArray(value)) {
    return value.length ? value.join(", ") : "Not available";
  }

  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  return String(value);
};

const buildDisplayFields = (profile) => {
  const provider = profile?.provider || profile || {};
  const details = profile?.providerDetails || {};
  const address = profile?.providerAddress || {};

  return [
    {
      key: "fullName",
      label: "Name",
      value: [provider.firstName, provider.lastName].filter(Boolean).join(" "),
    },
    {
      key: "role",
      label: "Role",
      value: provider.role,
    },
    {
      key: "gender",
      label: "Gender",
      value: provider.gender,
    },
    {
      key: "phone",
      label: "Phone",
      value: provider.phone,
    },
    {
      key: "email",
      label: "Email",
      value: provider.email,
    },
    {
      key: "clinicianName",
      label: "Clinician Name",
      value: details.clinicianName,
    },
    {
      key: "practices",
      label: "Practices",
      value: details.practices,
    },
    {
      key: "levelOfTreatment",
      label: "Level Of Treatment",
      value: details.levelOfTreatment,
    },
    {
      key: "patientAgeBracket",
      label: "Patient Age Bracket",
      value: details.patientAgeBracket,
    },
    {
      key: "experienceYears",
      label: "Experience Years",
      value: details.experienceYears,
    },
    {
      key: "availabilityInWeek",
      label: "Availability In Week",
      value: details.availabilityInWeek,
    },
    {
      key: "availabilityTime",
      label: "Availability Time",
      value: details.availabilityTime,
    },
    {
      key: "consultingFee",
      label: "Consulting Fee",
      value: details.consultingFee,
    },
    {
      key: "aboutMe",
      label: "About Me",
      value: details.aboutMe,
    },
    {
      key: "address",
      label: "Address",
      value: address.address,
    },
    {
      key: "city",
      label: "City",
      value: address.city,
    },
    {
      key: "state",
      label: "State",
      value: address.state,
    },
    {
      key: "zip",
      label: "Zip Code",
      value: address.zip,
    },
  ].filter((field) => field.value !== null && field.value !== undefined && field.value !== "");
};

function ProviderProfile() {
  const token = localStorage.getItem("token");
  const {
    profileImage,
    setProfileImage,
    profileName,
    setProfileName,
    providerProfile,
    setProviderProfile,
  } = useContext(ProviderProfileContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      setError("Please sign in again.");
      setLoading(false);
      return;
    }

    let active = true;

    const loadProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/healthcare/providers/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!active) return;

        const data = response.data;
        const provider = data?.provider || data;
        const fullName = provider?.firstName && provider?.lastName
          ? `${provider.firstName} ${provider.lastName}`
          : provider?.firstName || provider?.lastName || data?.providerDetails?.clinicianName || "Provider";
        const image =
          data?.providerProfileImage?.imageUrl ||
          data?.imageUrl ||
          data?.profileImage?.imageUrl ||
          data?.profileImageUrl ||
          null;

        setProviderProfile(data);
        setProfileName(fullName);
        setProfileImage(image);
        setError("");
      } catch (err) {
        if (!active) return;

        setError(
          err.response?.data?.message ||
            err.response?.data ||
            "Failed to load provider profile."
        );
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadProfile();

    return () => {
      active = false;
    };
  }, [token, setProfileImage, setProfileName, setProviderProfile]);

  const detailEntries = buildDisplayFields(providerProfile);

  return (
    <>
      <ProviderHeader />

      <Container className="provider-profile-page py-4">
        {loading ? (
          <div className="provider-profile-loading">
            <Spinner animation="border" role="status" />
          </div>
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : (
          <Row className="g-4">
            <Col lg={4}>
              <Card className="provider-profile-card shadow-sm">
                <Card.Body className="text-center">
                  <RBImage
                    src={profileImage || PROFILE_IMAGE_FALLBACK}
                    alt={profileName || "Provider"}
                    roundedCircle
                    className="provider-profile-avatar-large"
                  />
                  <h3 className="mt-3 mb-1">{profileName || "Provider"}</h3>
                  <p className="text-muted mb-0">
                    {providerProfile?.provider?.email || providerProfile?.email || "No email available"}
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={8}>
              <Card className="provider-profile-card shadow-sm">
                <Card.Header className="provider-card-background">
                  My Profile
                </Card.Header>
                <Card.Body>
                  <Row className="g-3">
                    {detailEntries.length === 0 ? (
                      <Col xs={12}>
                        <p className="mb-0">No provider details available.</p>
                      </Col>
                    ) : (
                      detailEntries.map((field) => (
                        <Col md={6} key={field.key}>
                          <div className="provider-profile-field">
                            <span className="provider-profile-label">
                              {field.label}
                            </span>
                            <span className="provider-profile-value">
                              {field.value}
                            </span>
                          </div>
                        </Col>
                      ))
                    )}
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
}

export default ProviderProfile;
