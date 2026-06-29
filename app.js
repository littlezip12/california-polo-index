
let rankings = Array.isArray(window.CPI_RANKINGS) ? window.CPI_RANKINGS : [];

function initials(team){
  const skip = new Set(["A","B","C","D","WPC","WP","CLUB"]);
  const words = team.replace(/[^A-Za-z0-9 ]/g,"").split(/\s+/).filter(Boolean);
  const picks = words.filter(w => !skip.has(w.toUpperCase()));
  const use = picks.length ? picks : words;
  return (use.slice(0,2).map(w => w[0].toUpperCase()).join("") || "CPI");
}
function moveLabel(m){ if(m>0)return`▲ +${m}`; if(m<0)return`▼ ${m}`; return "—"; }
function moveClass(m){ return m>0?"up":m<0?"down":"flat"; }
function rowTemplate(r){
  return `<tr>
    <td><strong>#${r.postRank}</strong></td>
    <td><div class="team-cell"><span class="mini-mark">${initials(r.team)}</span>${r.team}</div></td>
    <td>${Number(r.postCPI).toFixed(1)}</td>
    <td><span class="movement ${moveClass(r.movement)}">${moveLabel(r.movement)}</span></td>
    <td>${r.preRank ? "#" + r.preRank : "—"}</td>
    <td>${r.postRecord || "—"}</td>
    <td>${r.superFinalsRecord || "—"}</td>
    <td>${r.bestWin || "—"}</td>
  </tr>`;
}
function renderTable(){
  const q = (document.querySelector("#search")?.value || "").toLowerCase();
  const tbody = document.querySelector("#rankingsBody");
  if(!tbody) return;
  const filtered = rankings.filter(r => `${r.team}`.toLowerCase().includes(q));
  tbody.innerHTML = filtered.length ? filtered.map(rowTemplate).join("") : `<tr><td colspan="8" class="empty">No teams match that search.</td></tr>`;
  const count = document.querySelector("#count");
  if(count) count.textContent = `${filtered.length} teams`;
}
function init(){
  document.querySelector("#search")?.addEventListener("input", renderTable);
  renderTable();
}
init();
