
function logoMark(r, size="full"){
  if(r && r.logo){
    return `<img class="${size==="mini" ? "mini-logo-img" : "team-logo-img"}" src="${r.logo}" alt="${r.club || r.team} logo" loading="lazy">`;
  }
  return `<span class="${size==="mini" ? "mini-mark" : "team-mark"}">${(r && (r.initials || r.clubInitials)) || "CPI"}</span>`;
}
function clubLogo(c){
  if(c && c.logo){
    return `<img class="club-logo-img" src="${c.logo}" alt="${c.club} logo" loading="lazy">`;
  }
  return `<div class="team-mark">${(c && c.initials) || "CPI"}</div>`;
}
function heroStyle(obj){
  const p=(obj&&obj.primaryColor)||"#063A79", s=(obj&&obj.secondaryColor)||"#F7B500";
  return `style="--club-primary:${p};--club-secondary:${s};" data-primary="1"`;
}


let rankings=Array.isArray(window.CPI_RANKINGS)?window.CPI_RANKINGS:[];
let clubs=Array.isArray(window.CPI_CLUBS)?window.CPI_CLUBS:[];
function moveLabel(m){if(m>0)return`▲ +${m}`;if(m<0)return`▼ ${m}`;return"—"}
function moveClass(m){return m>0?"up":m<0?"down":"flat"}
function getParam(n){return new URLSearchParams(window.location.search).get(n)}
function rowTemplate(r){return`<tr><td><strong class="rank">#${r.postRank}</strong></td><td><a class="team-cell" href="${r.teamPage}">${logoMark(r,"mini")}${r.team}</a></td><td><a href="${r.clubPage}">${r.club}</a></td><td>${Number(r.postCPI).toFixed(1)}</td><td><span class="movement ${moveClass(r.movement)}">${moveLabel(r.movement)}</span></td><td>${r.preRank?"#"+r.preRank:"—"}</td><td>${r.latestTournamentRecord||"—"}</td><td>${r.bestWinClean||"—"}</td></tr>`}
function renderRankings(){const q=(document.querySelector("#search")?.value||"").toLowerCase();const tb=document.querySelector("#rankingsBody");if(!tb)return;const filtered=rankings.filter(r=>`${r.team} ${r.club}`.toLowerCase().includes(q));tb.innerHTML=filtered.length?filtered.map(rowTemplate).join(""):`<tr><td colspan="8">No teams match that search.</td></tr>`;const count=document.querySelector("#count");if(count)count.textContent=`${filtered.length} teams`}

function renderTeamPage(){
  const root=document.querySelector("#teamProfile");
  if(!root)return;
  const r=rankings.find(x=>x.slug===getParam("team"));
  if(!r){
    root.innerHTML=`<main><section class="panel"><h2>Team not found</h2><p>No team matches this link.</p></section></main>`;
    return;
  }
  document.title=`${r.team} | CPI`;
  const logo = r.logo ? `<img class="profile-logo-large" src="${r.logo}" alt="${r.club} logo" loading="lazy">` : `<div class="team-mark" style="width:120px;height:120px;font-size:34px;border-radius:28px">${r.initials}</div>`;
  root.innerHTML=`
  <section class="hero">
    <div>
      <p class="kicker">Team Profile · 14U Boys</p>
      <h1>${r.team}</h1>
      <p><a href="${r.clubPage}">${r.club}</a> profile with CPI rank, latest tournament record, and tournament highlight.</p>
    </div>
    <aside class="hero-visual" ${heroStyle(r)}>
      <div class="profile-hero-lockup">
        ${logo}
        <div>
          <div class="profile-hero-rank">#${r.postRank}</div>
          <div class="visual-tag"><span>CPI ${Number(r.postCPI).toFixed(1)}</span><span>${moveLabel(r.movement)}</span></div>
        </div>
      </div>
    </aside>
  </section>
  <main>
    <section class="panel">
      <h2>Latest Tournament</h2>
      <div class="profile-kpi-grid">
        <div class="profile-kpi"><strong>${r.latestTournamentRecord || "—"}</strong><span>Futures Super Finals record</span></div>
        <div class="profile-kpi"><strong>${r.bestWinClean || "—"}</strong><span>Best win</span></div>
        <div class="profile-kpi"><strong>${Number(r.postCPI).toFixed(1)}</strong><span>CPI Rating</span></div>
        <div class="profile-kpi"><strong>${moveLabel(r.movement)}</strong><span>Movement</span></div>
      </div>
    </section>
    <div class="section-head"><div><h2>Club</h2><p class="subtle">Logo and colors inherit from the club profile.</p></div><a class="btn" href="${r.clubPage}">View ${r.club}</a></div>
  </main>`;
}
function renderClubPage(){const root=document.querySelector("#clubProfile");if(!root)return;const c=clubs.find(x=>x.slug===getParam("club"));if(!c){root.innerHTML=`<main><section class="panel"><h2>Club not found</h2><p>No club matches this link.</p></section></main>`;return}document.title=`${c.club} | CPI`;const rows=c.teams.map(t=>`<tr><td><strong class="rank">#${t.postRank}</strong></td><td><a class="team-cell" href="${t.teamPage}">${logoMark(t,"mini")}${t.team}</a></td><td>${Number(t.postCPI).toFixed(1)}</td><td><span class="movement ${moveClass(t.movement)}">${moveLabel(t.movement)}</span></td><td>${t.latestTournamentRecord||"—"}</td><td>${t.bestWinClean||"—"}</td></tr>`).join("");root.innerHTML=`<section class="hero"><div><p class="kicker">Club Profile · 14U Boys</p><h1>${c.club}</h1><p>All currently ranked 14U Boys teams for ${c.club} in the California Polo Index.</p></div><aside class="hero-visual">${clubLogo(c)}<div class="visual-tag"><span>${c.teamCount} Ranked Team(s)</span><span class="blue">Best Rank</span><span class="gold">#${c.bestRank}</span></div></aside></section><main><section class="panel"><div class="table-wrap"><table><thead><tr><th>Rank</th><th>Team</th><th>CPI</th><th>Move</th><th>Latest Tournament</th><th>Best Win</th></tr></thead><tbody>${rows}</tbody></table></div></section></main>`}
document.querySelector("#search")?.addEventListener("input",renderRankings);renderRankings();renderTeamPage();renderClubPage();


function topCard(r){
  return `<article class="team-card">
    ${logoMark(r)}
    <div>
      <div class="rank-row"><span class="rank">#${r.postRank}</span><span class="movement ${moveClass(r.movement)}">${moveLabel(r.movement)}</span></div>
      <h3><a href="${r.teamPage}">${r.team}</a></h3>
      <p class="meta">CPI ${Number(r.postCPI).toFixed(1)} · Latest tournament ${r.latestTournamentRecord || "—"}</p>
      <p class="small">Best win: ${r.bestWinClean || "—"}</p>
    </div>
  </article>`;
}

function renderTopCards(){
  const home = document.querySelector("#topCards");
  if(home) home.innerHTML = rankings.slice(0,8).map(topCard).join("");
  const boys = document.querySelector("#boysTopCards");
  if(boys) boys.innerHTML = rankings.slice(0,8).map(topCard).join("");
}
renderTopCards();
