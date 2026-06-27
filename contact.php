<?php
/* ============================================================
   NORA BIRSAN — LOGOPEDA
   Script que rep el formulari de contacte i envia un correu.

   NO desa cap dada enlloc: només llegeix el formulari i envia
   un correu electrònic. No hi ha base de dades.

   *** ÚNICA COSA QUE POTSER HAURÀS DE CANVIAR ***
   La línia marcada com a "1)" més avall, amb el correu on vols
   rebre els missatges.
============================================================ */

header('Content-Type: application/json; charset=utf-8');

// 1) CORREU DE DESTÍ — el correu on Nora vol rebre les consultes
$correu_desti = "info@norabirsan.cat";

function respon($ok, $missatge = "") {
    echo json_encode(["ok" => $ok, "missatge" => $missatge]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respon(false, "Mètode no permès.");
}

// Recollim i netegem els camps del formulari
$nom       = isset($_POST['nom']) ? trim(strip_tags($_POST['nom'])) : '';
$telefon   = isset($_POST['telefon']) ? trim(strip_tags($_POST['telefon'])) : '';
$missatge  = isset($_POST['missatge']) ? trim(strip_tags($_POST['missatge'])) : '';
$consentit = isset($_POST['consentiment']);

// Validació bàsica
if ($nom === '' || $telefon === '' || !$consentit) {
    respon(false, "Falten camps obligatoris.");
}

if (mb_strlen($nom) > 150 || mb_strlen($telefon) > 50 || mb_strlen($missatge) > 3000) {
    respon(false, "Algun camp és massa llarg.");
}

// Construïm el correu
$assumpte = "Nova consulta des de la web — $nom";

$cos = "S'ha rebut una nova sol·licitud d'informació des de norabirsan.cat:\n\n";
$cos .= "Nom: $nom\n";
$cos .= "Telèfon: $telefon\n";
if ($missatge !== '') {
    $cos .= "Missatge:\n$missatge\n";
}
$cos .= "\n---\nAquest correu s'ha generat automàticament des del formulari de contacte.";

// Capçaleres — el "From" ha de coincidir amb el domini perquè Hostinger
// no marqui el correu com a brossa
$capsaleres = "From: Web Nora Birsan <web@norabirsan.cat>\r\n";
$capsaleres .= "Reply-To: $correu_desti\r\n";
$capsaleres .= "Content-Type: text/plain; charset=UTF-8\r\n";

$enviat = @mail($correu_desti, $assumpte, $cos, $capsaleres);

if ($enviat) {
    respon(true);
} else {
    respon(false, "No s'ha pogut enviar el correu.");
}

/* ============================================================
   NOTA TÈCNICA (només si el formulari no envia correus):

   Alguns allotjaments necessiten configuració addicional perquè
   la funció mail() de PHP funcioni correctament. Si en algun
   moment els correus no arriben (revisa també la carpeta de
   SPAM), la solució habitual a Hostinger és activar l'enviament
   per SMTP amb les dades del propi correu (per exemple amb la
   llibreria PHPMailer). Si arriba aquest cas, torna a Claude
   amb aquest mateix fitxer i t'ajudo a fer el canvi.
============================================================ */
