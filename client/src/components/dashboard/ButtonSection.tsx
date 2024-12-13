import "./Map.css";
import React, { useEffect, useState } from "react";

// Define the props type
interface ButtonSectionProps {
  area: string | null;
  setShowMap: React.Dispatch<React.SetStateAction<boolean>>;
  setShowGrowthForm: React.Dispatch<React.SetStateAction<boolean>>;
}


const ButtonSection: React.FC<ButtonSectionProps> = (props) => {
  const [isNewTreesDialogOpen, setNewTreesDialogOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [reportNewTreeFormData, setReportNewTreeFormData] = useState({
    treeSpecies: "acacia",
    plantingLocation: props.area,
    numberOfTrees: "",
  });

  useEffect(() => {
    setReportNewTreeFormData({
      ...reportNewTreeFormData,
      plantingLocation: props.area,
    });
  }, [props.area])

  // Functions to open the dialog
  const openNewTreesDialog = () => {
    setNewTreesDialogOpen(true);
  };

  // Functions to close the dialog
  const closeNewTreesDialog = () => {
    setNewTreesDialogOpen(false);
  };

  const handleChangeInNewTreesDialog = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    console.log("jiji:,",reportNewTreeFormData)
    const { name, value, type } = e.target;
    setReportNewTreeFormData({
        ...reportNewTreeFormData,
        [name]: value,
      });
  };

  const handleReportNewTreesSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log("HEREE:", reportNewTreeFormData)
      const response = await fetch("http://localhost:5001/report-tree", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reportNewTreeFormData),
      });
      

      if (response.ok) {
        closeNewTreesDialog()
        setSuccessMessage("Tree report submitted successfully!");
        setTimeout(() => setSuccessMessage(""), 5000);
      } else {
        console.error("Failed to submit the report:", response);
        alert("Failed to submit the tree report.");
      }
    } catch (error) {
      console.error("Error during fetch:", error);
      alert("An error occurred while submitting the report.");
    }
  };
  const openMeasurementDialogue = () => {
    props.setShowMap(false);
    props.setShowGrowthForm(true)
  };

  if (props.area != null) {
    return ( 
      <div>
      <div className="button-section">
        <button
          className="button"
          onClick={openNewTreesDialog}
        >
          Report new trees
        </button>
        <button
          className="button"
          onClick={openMeasurementDialogue}
        >
          Report measurements
        </button>



        {/* Dialog for reporting new trees */}
        {isNewTreesDialogOpen && (
          <dialog open>
            <form onSubmit={handleReportNewTreesSubmit}>
              <h2>Report New Trees</h2>
                <div>
                  <label>Tree species: </label>
                    <select name="treeSpecies" value={reportNewTreeFormData.treeSpecies} onChange={handleChangeInNewTreesDialog} required>
                      <option value="acacia">Acacia</option>
                      <option value="baobab">Baobab</option>
                      <option value="eucalyptus">Eucalyptus</option>
                      <option value="mahogany">Mahogany</option>
                      <option value="mukwa">Mukwa</option>
                      <option value="mopane">Mopane</option>
                    </select>
                </div>
                <div>
                  <label>Location:  </label>
                  {props.area}
                </div>
                <div>
                  <label>
                    Number of trees:  
                    <input type="number" name="numberOfTrees" value={reportNewTreeFormData.numberOfTrees} onChange={handleChangeInNewTreesDialog} min="1" className="dialog-number-input" required/>
                  </label>
                </div>

                {/* Button to submit the form */}
                <button className = "dialog-button" type="submit">Submit</button>

                {/* Close button for the dialog */}
                <button className="dialog-button dialog-button-close" type="button" onClick={closeNewTreesDialog}>
                  Close
                </button>
              </form>
            </dialog>
          )}
          </div>
        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>
    );
  }
  return <></>
};

export default ButtonSection;