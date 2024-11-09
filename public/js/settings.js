  
  document.addEventListener('DOMContentLoaded', () => {
    applySavedCloakingSettings();
  
    const presetSelect = document.getElementById('presetSelect');
    const customTitleInput = document.getElementById('customTitleInput');
    const customIconInput = document.getElementById('customIconInput');
    const applyCloakButton = document.getElementById('applyCloakButton');
    const panicButton = document.getElementById('panicButton');
    const panicUrlInput = document.getElementById('panicUrlInput');
  
    presetSelect.addEventListener('change', () => {
      const selectedOption = presetSelect.value;
      if (presetOptions[selectedOption]) {
        setTabCloaking(presetOptions[selectedOption].title, presetOptions[selectedOption].icon);
        saveCloakingSettings(presetOptions[selectedOption].title, presetOptions[selectedOption].icon);
      }
    });
  
    applyCloakButton.addEventListener('click', () => {
      const customTitle = customTitleInput.value;
      const customIcon = customIconInput.value;
      if (customTitle && customIcon) {
        setTabCloaking(customTitle, customIcon);
        saveCloakingSettings(customTitle, customIcon);
      }
    });
  
    panicButton.addEventListener('click', () => {
      const panicUrl = panicUrlInput.value;
      if (panicUrl) {
        handlePanic(panicUrl);
      }
    });
  });
  