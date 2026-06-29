
let rankings = [];

function initials(team){
  const skip = new Set(["A","B","C","D","WPC","WP","CLUB"]);
  const words = team.replace(/[^A-Za-z0-9 ]/g,"").split(/\s+/).filter(Boolean);
  const picks = words.filter(w => !skip.has(w.toUpperCase()));
  const use = picks.length ? picks : words;
  return (use.slice(0,2).map(w => w[0].toUpperCase()).join("") || "CPI");
}

function moveLabel(m){
  if(m > 0) return `▲ +${m}`;
  if(m < 0) return `▼ ${m}`;
  return "—";
}
function moveClass(m){ return m > 0 ? "up" : m < 0 ? "down" : "flat"; }

function rowTemplate(r){
  return `<tr>
    <td><strong>#${r.postRank}</strong></td>
    <td><div class="team-cell"><span class="mini-mark">${initials(r.team)}</span>${r.team}</div></td>
    <td>${r.postCPI.toFixed(1)}</td>
    <td><span class="movement ${moveClass(r.movement)}">${moveLabel(r.movement)}</span></td>
    <td>${r.preRank ? "#" + r.preRank : "—"}</td>
    <td>${r.postRecord || "—"}</td>
    <td>${r.superFinalsRecord || "—"}</td>
    <td>${r.bestWin || "—"}</td>
    <td><span class="badge">${r.division || "—"}</span></td>
  </tr>`;
}

function renderTable(){
  const q = (document.querySelector("#search")?.value || "").toLowerCase();
  const div = document.querySelector("#division")?.value || "all";
  const tbody = document.querySelector("#rankingsBody");
  if(!tbody) return;
  const filtered = rankings.filter(r => {
    const matchesSearch = `${r.team} ${r.division}`.toLowerCase().includes(q);
    const matchesDiv = div === "all" || r.division === div;
    return matchesSearch && matchesDiv;
  });
  tbody.innerHTML = filtered.map(rowTemplate).join("");
  const count = document.querySelector("#count");
  if(count) count.textContent = `${filtered.length} teams`;
}

async function init(){
  const res = await fetch("data/rankings.json");
  rankings = await res.json();

  const divisionSelect = document.querySelector("#division");
  if(divisionSelect){
    const divisions = [...new Set(rankings.map(r => r.division).filter(Boolean))].sort();
    divisionSelect.innerHTML = `<option value="all">All divisions</option>` + divisions.map(d => `<option value="${d}">${d.replaceAll("_"," ")}</option>`).join("");
  }
  document.querySelector("#search")?.addEventListener("input", renderTable);
  document.querySelector("#division")?.addEventListener("change", renderTable);
  renderTable();
}
init();
