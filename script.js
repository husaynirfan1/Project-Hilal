document.getElementById('moon-form').addEventListener('submit', (e) => {
  e.preventDefault()
  const location = document.getElementById('location').value
  const date = document.getElementById('date').value
 //`https://raw.githubusercontent.com/your-username/your-repo-name/main/data/${location.replace(/ /g, '_').toLowerCase()}.json`
 
 // Fetch moon data based on location and date
  fetch(`https://github.com/husaynirfan1/Project-Hilal/blob/main/assets/data/Asia/Kuala_Lumpur/Terengganu.json`)
    .then(response => response.json())
    .then(data => {
      // Flatten the data to find the entry for the selected date
      const moonDataArray = Object.values(data.location).flat();
      const moonData = moonDataArray.find(item => item.date === date)
      if (moonData) {
        const { Moon_illumination, Moon_phase } = moonData

        // Update moon phase and visibility
        document.getElementById('moon-icon').textContent = getMoonIcon(Moon_phase)
        document.getElementById('moon-phase').textContent = Moon_phase
        document.getElementById('moon-visibility').textContent = `Visibility: ${parseFloat(Moon_illumination).toFixed(2)}%`

        // Full Report
        const fullReport = `Moon Visibility Report\nLocation: ${moonData.location}\nDate: ${moonData.date}\nPhase: ${Moon_phase}\nVisibility: ${parseFloat(Moon_illumination).toFixed(2)}%`
        document.getElementById('full-report').value = fullReport

        // Show results section
        document.getElementById('results').classList.remove('hidden')
      } else {
        alert('No data found for the selected location and date.')
      }
    })
    .catch(error => console.error('Error fetching moon data:', error))
})

const getMoonIcon = (phase) => {
  switch (phase) {
    case "New Moon":
      return "🌑"
    case "Waxing Crescent":
      return "🌒"
    case "First Quarter":
      return "🌓"
    case "Waxing Gibbous":
      return "🌔"
    case "Full Moon":
      return "🌕"
    case "Waning Gibbous":
      return "🌖"
    case "Third Quarter":
      return "🌗"
    case "Waning Crescent":
      return "🌘"
    default:
      return "🌙"
  }
}

fetch('https://github.com/husaynirfan1/Project-Hilal/blob/main/assets/data/Asia/Kuala_Lumpur/Terengganu.json')
  .then(response => response.json())
  .then(data => {
    const presetCards = document.getElementById('preset-cards')
    data.forEach((preset, index) => {
      const card = document.createElement('div')
      card.className = 'bg-white border border-gray-200 rounded-lg shadow-md p-6 space-y-2'
      card.innerHTML = `
        <p class="text-gray-500 dark:text-gray-400">Location: ${preset.location}</p>
        <p class="text-gray-500 dark:text-gray-400">Date: ${preset.date}</p>
        <p class="text-gray-500 dark:text-gray-400">Phase: ${preset.phase}</p>
        <p class="text-gray-500 dark:text-gray-400">Visibility: ${preset.illumination.toFixed(2)}%</p>
      `
      presetCards.appendChild(card)
    })
  })
  .catch(error => console.error('Error fetching preset data:', error))
