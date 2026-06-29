
let rankings = Array.isArray(window.CPI_RANKINGS) ? window.CPI_RANKINGS : [];
function moveLabel(m){ if(m>0)return`▲ +${m}`; if(m<0)return`▼ ${m}`; return "—"; }
function moveClass(m){ return m>0?"up":m<0?"down":"flat"; }
function rowTemplate(r){return `<tr><td><strong class="rank">#${r.postRank}</strong></td><td><a class="team-cell" href="${r.teamPage}"><span class="mini-mark">${r.initials}</span>${r.team}</a></td><td>${Number(r.postCPI).toFixed(1)}</td><td><span class="movement ${moveClass(r.movement)}">${moveLabel(r.movement)}</span></td><td>${r.preRank ? "#" + r.preRank : "—"}</td><td>${r.latestTournamentRecord || "—"}</td><td>${r.tournamentHighlight || "—"}</td></tr>`;}
function renderTable(){const q=(document.querySelector("#search")?.value||"").toLowerCase();const tbody=document.querySelector("#rankingsBody");if(!tbody)return;const filtered=rankings.filter(r=>`${r.team} ${r.club}`.toLowerCase().includes(q));tbody.innerHTML=filtered.length?filtered.map(rowTemplate).join(""):`<tr><td colspan="7" class="empty">No teams match that search.</td></tr>`;const count=document.querySelector("#count");if(count)count.textContent=`${filtered.length} teams`;}
document.querySelector("#search")?.addEventListener("input", renderTable);renderTable();
