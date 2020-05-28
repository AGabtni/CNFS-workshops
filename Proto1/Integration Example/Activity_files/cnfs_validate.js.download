//HACK: Mise en commentaire. Ce code n'est plus valide.
//checkCookie();

/*
document.addEventListener('DOMContentLoaded', function() {

    alert(environment.workshopId);

}, false);
*/




function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1);
    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
  }
  return "";
}

function setCookie(name, value) {

  var date = new Date();
  date.setTime(date.getTime() + (1 * 24 * 60 * 60 * 1000));
  var expires = "; expires=" + date.toGMTString();
  document.cookie = name + "=" + value + expires + "; path=/";
}

function checkCookie() {
  var userId = getCookie("CNFSAccessToken_UserId");
  var workshopId = getCookie("CNFSAccessToken_WorkshopId");
  var examAccess = getCookie("CNFSAccessToken_ExamAccess");
  var examAttemptsLeft = getCookie("CNFSAccessToken_ExamAttemptsLeft");

  var url = location.pathname;
  var temp = url.split("?")[0].split("/");
  var pagename = temp[temp.length - 1];

  if (pagename == "examen.html") {
    $(window).keydown(function (event) {
      if (event.keyCode == 13) {
        event.preventDefault();
        return false;
      }
    });
  }


  if (pagename == "examen.html" && parseInt(examAttemptsLeft) <= 0) {
    document.location.href = "accesrefuse.html";
  }

  else {
    // Si l'utilisateur est authentifié
    if (userId != "") {
    }
    // Sinon
    else {
      document.location.href = "/assets/atelierscnfs/unauthorized.html";
    }
  }
}

function submitAnswers(act_name) {
  console.log("> cnfs_validate.js > submitAnswers().act_name = " + act_name);
  var answers = "";
  for (var i = 1; i < 1000; i++) {
    var currentId = act_name + "_q" + i;
    var currentInputs = document.getElementsByName(currentId);

    console.log("> cnfs_validate.js > submitAnswers().currentId = " + currentId);
    console.log("> cnfs_validate.js > submitAnswers().currentInputs = " + currentInputs);

    if (currentInputs.length == 0)
      break;

    var currenrInputType = currentInputs[0].type;
    if (currenrInputType == "radio") {
      var retVal = "";
      if ($("input[name='" + currentId + "']:checked").length == 1) {
        retVal = $("input[name='" + currentId + "']:checked")[0].id.replace(currentId + "_", "");
        answers = answers + i + "(" + retVal + "):";
      }
    }
    else if (currenrInputType == "select-one") {
      answers = answers + i + "(" + $('select[name=' + currentId + ']', this).val() + "):"; //answers = answers + i + "(" + $('select[name=' + currentId + ']', '#exam-form').val() + "):";
    }
    else if (currenrInputType == "checkbox") {
      var allVals = [];
      $("input[name='" + currentId + "']:checked").each(function () {
        allVals.push($(this).attr("id").replace(currentId + "_", ""));
      });
      var answer = allVals.join(" ");
      answers = answers + i + "(" + answer + "):";
    } else if (currenrInputType == "textarea") {
      answers = answers + i + "(" + $("textarea[name='" + currentId + "']").val() + "):";
    } else {
      answers = answers + i + "(" + $("input[name='" + currentId + "']").val() + "):";
    }
  }

  return answers;
}

/**
 * Petite fonction qui permet de retourner une valeur par défaut, au choix, si le premier argument est indéfini (undefined).
 * @param {any} value Valeur à tester.
 * @param {any} defaultValue Valeur par défaut si le premier argument est indéfini (undefined).
 */
function isNull(value, defaultValue) {
  if (value === undefined) {
    return defaultValue;
  }

  return value;
}

/**
 * Fonction pour modifier le lien de la page vers l'examen.
 * Appel au service de l'API.

 */
function ModifierLienExamen(controle) {

  // Récupération du contrôle HTML.


  // Retirer temporairement l'URL.
  console.log("...");
  controle.attr('href', '');

  // Sur clic, rechercher la nouvelle URL.
  controle.click(function (event) {
    // Appel AJAX pour récupérer l'URL de l'examen.
    $.ajax({
      async: false,
      url: 'https://ateliers-examens-staging.azurewebsites.net/api/exam/' + getCookie("CNFSAccessToken_SubscriptionId"), // URL A CHANGER
      type: "GET",
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + getCookie('cnfs.token'));
      },
      success: function (url) {
        // Réussite, on change de localisation.
        console.log("success : URL = " + url);
        controle.attr('href', url);
      },
      error: function (data) {
        // Erreur... On va vers la page Not Found.
        console.log('Erreur lors de l\'ouverture de l\'examen : ' + data);
        controle.attr('href', '/public/notFound');
      }
    });
  });
}

$(document).ready(function () {
  console.log("Page chargée");

  const controle1 = $('a[href="/public/exam-subscribe"]');

  ModifierLienExamen(controle1);


	/*
	function clickExam(exam){
		console.log("Delayed!");
		exam.click();
		
	}
	window.setTimeout( clickExam, 2000, controle1 );  */

  $('.exam-form').submit(function (event) {
    console.log("> cnfs_validate.js > .exam-form.submit()");
    event.preventDefault();
    var examData = submitAnswers($(this).attr("data-target"));
    var activityType = $(this).attr("data-target");
    var allowMultipleAttempts = $(this).attr("data-multiple-attempts");
    var redirect = $(this).attr("data-redirect");
    var updateValue = isNull($(this).attr("data-update"), "0") === "1";   // Nouvel indicateur.
    var userId = getCookie("CNFSAccessToken_UserId");
    var workshopId = getCookie("CNFSAccessToken_WorkshopId");
    var examSuccess = false;
    var token = 'Bearer ' + getCookie('cnfs.token');

    console.log("> exam-data = " + examData);

    $.ajax({
      async: false,
      url: '/api/Workshop/SubmitExam',
      type: 'post',
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      headers: { 'Authorization': token },
      data: JSON.stringify({ answers: examData, user: userId, workshop: workshopId, score: 0, activityType: activityType, allowMultipleAttempts: allowMultipleAttempts, fakeDataToAvoidCache: new Date(), updateActivated: updateValue }),
      success: function (data) {
        console.log("> .exam-form.submit().success.data = " + data);
        examSuccess = data;
      },
      error: function (xhr, ajaxOptions, thrownError) {
        if (xhr.status == 200) { examSuccess = true; }
        console.log("> .exam-form.submit().error.status = " + xhr.status);
        console.log("> .exam-form.submit().error.thrownerror = " + thrownError);
      }

    });

    var examAttemptsLeft = parseInt(getCookie("CNFSAccessToken_ExamAttemptsLeft"));
    if (activityType == "examen-final") {
      examAttemptsLeft--;
    }

    setCookie("CNFSAccessToken_ExamAttemptsLeft", examAttemptsLeft);

    if (redirect == "1") {
      if (examSuccess) {
        window.location.href = "succes-" + activityType + ".html";
      }
      else {
        window.location.href = "echec-" + activityType + ".html";
      }
    }


  });
});

/* Matomo */
/*
  var _paq = _paq || [];

  _paq.push(["setDocumentTitle", document.domain + "/" + document.title]);
  _paq.push(["setDomains", ["*.ateliers.cnfs.ca"]]);

  var portalUserID = getCookie("CNFSAccessToken_UserId");
  _paq.push(['setCustomVariable', 1, "PortalUserID", portalUserID, "visit"]);

  _paq.push(['trackPageView']);
  _paq.push(['enableLinkTracking']);
  (function() {
    var u="https://matomo.mmdist.uottawa.ca/";
    _paq.push(['setTrackerUrl', u+'piwik.php']);
    _paq.push(['setSiteId', '6']);
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'piwik.js'; s.parentNode.insertBefore(g,s);
  })(); */
