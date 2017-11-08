//irei alterar
function openMenu() {
    $("#fullscreen-menu").show()
}

//irei alterar
function closeMenu() {
    $("#fullscreen-menu").hide()
}

function toggleMenu() {
    let menu = $("#fullscreen-menu")

    if (menu.is(":visible")) {
        menu.removeClass("slideInRight")
        menu.addClass("slideOutRight")
        $("#menu-btn").removeClass("open")

        window.setTimeout(function() {
            menu.hide()
        }, 1000)
    } else {
        menu.removeClass("slideOutRight")
        menu.addClass("slideInRight")
        menu.css("display", "flex")
        menu.show()
    }
}

document.onkeydown = function (e) {
    if (e.keyCode == 27) {
        if ($("#fullscreen-menu").is(":visible"))
            toggleMenu();
    }
};

function calcularDias(data) {
    var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    var firstDate = new Date(data.substring(0, 4), parseInt(data.substring(5, 7)) - 1, data.substring(8, 10));
    var secondDate = new Date();
    var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
    return diffDays;
}

jQuery(document).ready(function ($){
    
    $('#menu-btn').click(function(){
        $(this).toggleClass('open');
        toggleMenu();
    });
    
    $("ul.menu-list-group a").click(function() {
        toggleMenu();
    })
    
    function getData(endpoint, method) {
        return $.ajax({
            url : endpoint,
            type: method
        });
    }
    
    function handleData(data) {
        return data;
    }

    $(window).scroll(function () {
        if ($(this).scrollTop() > 700 && window.innerWidth > 767) {
            $('.scrollToTop').fadeIn();
        } else {
            jQuery('.scrollToTop').fadeOut("slow");
        }
    });
    
    $('.scrollToTop').click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 800);
        return false;
    });

    
//********************************* INICIO---->   FUNÇÃO QUE ADICIONA IDEIAS NO CARROSSEL (SECTION-ACONTECENDO)
    getData("http://localhost:8080/ideas", "GET").done(handleData).then(function(data){
        var ideias = data;
        
        //PARA CADA IDEIA, CRIA-SE O HTML PARA POSTERIOR ADIÇÃO AO CARROSSEL
            /*MODELO ATUAL:
                    <div class="card border-light" style="position: absolute; left: 0%;">
                        <div class="card-body">
                            <p class="card-text">${ideia.description}</p>
                            <h5 class="card-title">${ideia.email}</h5>
                        </div>
                    </div>
            */
        ideias.forEach(function (ideia) {
            var carrossel = $('.section-acontecendo .carousel');
        
            var div1 = document.createElement("div");
            div1.setAttribute("class", "card border-light");
        
            var div2 = document.createElement("div");
            div2.setAttribute("class", "card-body");
            div1.appendChild(div2);
        
            var p = document.createElement("p");
            p.setAttribute("class", "card-text");
            p.innerText = ideia.description;                                                                            //${ideia.description}
            div2.appendChild(p);
        
            var h5 = document.createElement("h5");
            h5.setAttribute("class", "card-title");
            h5.innerText = ideia.email;                                                                                 //${ideia.email}
            div2.appendChild(h5);
            
            //METODO DO FLICKITY PARA INSERÇÃO DE NOVOS ELEMENTOS AO CARROSSEL
                /* carrosselDestino.flickity('prepend/append', elementoHTML); */
            $('.section-acontecendo .carousel').flickity('prepend', div1);
        });
    });
//********************************* FIM---->   FUNÇÃO QUE ADICIONA IDEIAS NO CARROSSEL (SECTION-ACONTECENDO)

//********************************* INICIO---->   FUNÇÃO QUE ADICIONA EVENTOS AO FEED DE NOTICIAS EM (SECTION-ACONTECENDO)
    getData("http://localhost:8080/gitlab/events", "GET").done(handleData).then(function(data){
        var eventos = data;

        //PARA CADA EVENTO, CRIA-SE O HTML PARA POSTERIOR ADIÇÃO AO FEED DE NOTICIAS
            /*MODELO ATUAL:
                    <div class="list-group-item list-group-item-action flex-column align-items-start" href="#">
                        <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1">${evento.project_name}</h5>
                            <small>${evento.data}</small>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <p class="event-text">Evento:</p>
                            </div>
                            <div class="col-md-6">
                                <p class="author">${evento.author_username}</p>
                            </div>
                        </div>
                        <p class="event-description">${evento.commits.message}</p>
                    </div>
            */
        var feedCommits = $(".section-acontecendo .list-group")[0];
        eventos.forEach(function (evento) {
    
            var div = document.createElement("div");
            div.setAttribute("class", "list-group-item list-group-item-action flex-column align-items-start");
            div.setAttribute("href", "#");
    
            var div2 = document.createElement("div");
            div2.setAttribute("class", "d-flex w-100 justify-content-between");
            div.appendChild(div2);

            var div3 = document.createElement("div");
            div3.setAttribute("class", "row");
            div.appendChild(div3);

            var div4 = document.createElement("div");
            div4.setAttribute("class", "col-md-6");
            div3.appendChild(div4);

            var p3 = document.createElement("p");
            p3.setAttribute("class", "event-text");
            p3.innerText = "Evento:"
            div4.appendChild(p3);

            var div5 = document.createElement("div");
            div5.setAttribute("class", "col-md-6");
            div3.appendChild(div5);
            
            var p2 = document.createElement("p");
            p2.setAttribute("class", "mb-1");
            p2.setAttribute("class", "author");

            p2.innerText = evento.author_username;
            if (evento.data != null)
                if (typeof evento.data.user_name != "undefined")
                    p2.innerText = evento.data.user_name;                                                               //${evento.author_username
            
            div5.appendChild(p2);                                                                          
    
            var h5 = document.createElement("h5");
            h5.setAttribute("class", "mb-1");
            h5.innerText = evento.project_name;                                                                         //${evento.project_name}
            div2.appendChild(h5);
            
            var p = document.createElement("p");
            p.setAttribute("class", "mb-1");
            p.setAttribute("class", "event-description");
            if (evento.target_title != null) {
                p.innerText = "Evento: " + evento.target_title;
            } else {
                var tamanho = 0;
                if (evento.data != null)
                    if (typeof evento.data.commits != "undefined")
                       tamanho = evento.data.commits.length;
                
                if (tamanho > 0) {
                    p.innerText =evento.data.commits[tamanho - 1].message.split(/\n/)[0];
                    div.appendChild(p);                                                                                   //${evento.commits.message}
                    
                    var small = document.createElement("small");
                    var dias = parseInt(calcularDias(evento.created_at));
                    if (dias <= 7) {
                        small.innerText = "Há " + dias + " dia";
                        if (dias != 1)
                            small.innerText += "s";
                    } else
                        small.innerText = (evento.created_at.substring(8, 10) + "/" + evento.created_at.substring(5, 7) + "/" + evento.created_at.substring(0, 4));
                    
                    if (dias == 0)
                        small.innerText = "Hoje";
                    
                    div2.appendChild(small);                                                                               //${evento.data}
        
                    //ADICIONAR EVENTO AO FEED
                    feedCommits.appendChild(div);
                } 
            }
        });
    });
//********************************* FIM---->   FUNÇÃO QUE ADICIONA EVENTOS AO FEED DE NOTICIA EM (SECTION-ACONTECENDO)
    

//********************************* INICIO---->   FUNÇÃO QUE ADICIONA PROJETOS NO CARROSSEL EM (SECTION-PROJETOS)
    getData("http://localhost:8080/gitlab/projects/", "GET").done(handleData).then(function(data){
        var projetos = data;

        //PARA CADA EVENTO, CRIA-SE O HTML PARA POSTERIOR ADIÇÃO AO FEED DE NOTICIAS
            /*MODELO ATUAL:
                    <div class="card">
                        <div class="card-header">
                            <h5 class="card-title">${projeto.name}</h5>
                        </div>
                        <div class="card-body">
                            <p class="card-text">${projeto.description}</p>
                        </div>
                        <div class="card-footer">
                            <button type="button" class="btn btn-floating btn-disabled btn-floating-git"
                                                                    onclick="javascript: window.open('${projeto.web_url}','_blank')">
                                <img class="img-btn-floating" src="images/gitlabicon.png">
                            </button>
                            <button type="button" class="btn btn-floating btn-disabled" id="${projeto.id}"
                                                            data-toggle="modal" data-id="${projeto.id}" data-target="#modal-projects">
                                <img class="img-btn-floating" src="images/options.svg">
                            </button>
                        </div>
                    </div>
            */
        projetos.forEach(function (projeto) {    
            var div1 = document.createElement("div");
            div1.setAttribute("class", "card");
        
            var divHeader = document.createElement("div");
            divHeader.setAttribute("class", "card-header");
            div1.appendChild(divHeader);
        
            var div2 = document.createElement("div");
            div2.setAttribute("class", "card-body");
            div1.appendChild(div2);
        
            var divFooter = document.createElement("div");
            divFooter.setAttribute("class", "card-footer");
            div1.appendChild(divFooter);
        
            var h5 = document.createElement("h5");
            h5.setAttribute("class", "card-title");
            h5.innerText = projeto.name;                                                                                //${projeto.name}
            divHeader.appendChild(h5);
        
            var p = document.createElement("p");
            p.setAttribute("class", "card-text");
            if (projeto.description != null)
                p.innerText = projeto.description.substring(0, 88);
        
            if (p.innerText == '') {
                p.innerHTML = "<i>Sem descrição</i>";
            }
        
            div2.appendChild(p);                                                                                        //${projeto.description}
        
            var btnDesc = document.createElement("button");
            btnDesc.setAttribute("type", "button");
            btnDesc.setAttribute("class", "btn btn-floating btn-disabled");
        
            var imgBtn = document.createElement("img");
            imgBtn.setAttribute("class", "img-btn-floating");
            imgBtn.setAttribute("src", "images/3-dots.svg");
            btnDesc.appendChild(imgBtn)
        
            var btnGit = btnDesc.cloneNode(true);
            btnGit.classList.add("btn-floating-git");
            btnGit.childNodes[0].setAttribute("src", "images/gitlabicon.png");
            btnGit.setAttribute("onclick", "javascript: window.open('" + projeto.web_url + "','_blank')");              //${projeto.web_url}
        
            btnDesc.setAttribute("id", projeto.id);                                                                     //${projeto.id}
            btnDesc.setAttribute("data-toggle", "modal");
            btnDesc.setAttribute("data-id", projeto.id);                                                                //${projeto.id}
            btnDesc.setAttribute("data-target", "#modal-projects");
        
            divFooter.appendChild(btnGit);
            divFooter.appendChild(btnDesc);

            //METODO DO FLICKITY PARA INSERÇÃO DE NOVOS ELEMENTOS AO CARROSSEL
                /* carrosselDestino.flickity('prepend/append', elementoHTML); */
            $('.projetos .carrossel-projetos .carousel').flickity('append', div1);
        });


        //METODOS DO FLICKITY PARA ADIÇÃO DE EVENTOS AO CARROSEL
            //CRIAÇÃO DO OBJETO FLKTY
        var flkty = new Flickity('.projetos .carrossel-projetos .carousel');

            //EVENTO SELECT -> FAZER A TROCA DE CLASSES DOS BOTÕES DO RESPECTIVO PROJETO
        flkty.on('select', function () {
            for (var i = 0; i < $('.carrossel-projetos .card .card-footer').length; i++) {
                $('.carrossel-projetos .card .card-footer')[i].childNodes[0].classList.add('btn-disabled');
                $('.carrossel-projetos .card .card-footer')[i].childNodes[1].classList.add('btn-disabled');
            }

            $('.carrossel-projetos .card .card-footer')[flkty.selectedIndex].childNodes[0].classList.remove('btn-disabled');
            $('.carrossel-projetos .card .card-footer')[flkty.selectedIndex].childNodes[1].classList.remove('btn-disabled');
        });

            //EVENTO CLICK -> REALIZAR A SELEÇÃO DO PROJETO ATRAVES DE UM CLICK
        flkty.on('staticClick', function (event, pointer, cellElement, cellIndex) {
            if (!cellElement) {
                return;
            }

            flkty.selectCell(cellIndex);
        });
        

        //INICIALIZAÇÃO NO TERCEIRO PROJETO DO CARROSSEL
            //(LEMBRANDO QUE OS PROJETOS VEM DO BACK-END JÁ ORDENADO PELA ULTIMA MODIFICAÇÃO)
        flkty.selectCell(2);
    });
//********************************* FIM---->   FUNÇÃO QUE ADICIONA PROJETOS NO CARROSSEL EM (SECTION-PROJETOS)

//********************************* INICIO---->   FUNÇÃO QUE ADICIONA INFORMAÇÕES AO MODAL DE PROJETOS EM (SECTION-PROJETOS)
    $('#modal-projects').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var modalProjectID = button.data('id');                                 //CAPTURA DO ID DO PROJETO SELECIONADO

        //CRIAÇÃO DE UM MODELO PARA INSERÇÃO DE COLABORADORES
            /*MODELO ATUAL:
                <h6>
                    <span>${membro.name}</span>
                    <div class="div-absolute">
                        <button type="button" class="btn btn-absolute absolute-1" data-toggle="tooltip" title="${membro.username} + '@s2it.com.br'"></button>
                        <button type="button" class="btn btn-absolute absolute-2" data-toggle="tooltip" title="Slack!"></button>
                    </div>
                </h6>
            */
        var newH6 = document.createElement("h6");
        var newSpan = document.createElement("span");
        newH6.appendChild(newSpan);

        var newDiv = document.createElement("div");
        newDiv.classList.add("div-absolute");
        var newButtonMail = document.createElement("button");
        newButtonMail.type = "button";
        newButtonMail.classList.add("btn", "btn-absolute");
        newButtonMail.setAttribute("data-toggle", "tooltip");
        var newButtonSlack = newButtonMail.cloneNode(true);                     //CLONA EM DOIS BOTÕES ENQUANTO AS INFORMAÇÕES SERÃO AS MESMAS

        newButtonMail.title = "Enviar e-mail";
        newButtonSlack.title = "Abrir slack";
        newButtonMail.classList.add("absolute-1");
        newButtonSlack.classList.add("absolute-2");
        newDiv.appendChild(newButtonMail);
        newDiv.appendChild(newButtonSlack);
        newH6.appendChild(newDiv);
        
        var modal = $(this);

        //PESQUISA DAS INFORMAÇÕES DO PROJETO CUJO MODAL DE DETALHES SERÁ ABERTO
        getData("http://localhost:8080/gitlab/projects/" + modalProjectID, "GET").done(handleData).then(function(data){
            var projeto = data;

            //INSERE ID DE PROJETOS PARA POPOVER DE IDEIAS
            $("#id-popover").val(modalProjectID);
            
            //ADICIONAR CLICK GITLAB DENTRO DO MODAL
            $("#btn-gitlab").on("click", function () {
                window.open(projeto.web_url, '_blank')
            });
            
            modal.find('.modal-title h2').text(projeto.name);                   //ALTERA TITULO DO MODAL COM INFORMAÇÕES DO PROJETO CORRESPONDENTE
            modal.find('.modal-body h4').text(projeto.description);             //ALTERA A DESCRIÇÃO DO MODAL COM INFORMAÇÕES DO PROJETO CORRESPONDENTE
    
    
            getData("http://localhost:8080/gitlab/projects/" + modalProjectID + "/members", "GET").done(handleData).then(function(data){
                var membros = data;

                //PARA CADA MEMBRO, ALTERA-SE INFORMAÇÕES DOS BOTÕES E-MAIL E SLACK
                    //OS BOTÕES AINDA NÃO ESTÃO EM TOTAL FUNCIONAMENTO
                membros.forEach(function (membro) {
                    //UTILIZA O MODELO CRIADO ANTES DA PESQUISA DESSAS INFORMAÇÕES, COM O USO DE UMA VARIÁVEL AUXILIAR
                    var newH6_Aux = newH6.cloneNode(true);

                    newH6_Aux.childNodes[0].innerHTML = membro.name;                                                    //${membro.name}
                    newH6_Aux.childNodes[1].childNodes[0].setAttribute("title", membro.username + "@s2it.com.br");      //${membro.username} + '@s2it.com.br'
                    newH6_Aux.childNodes[1].childNodes[1].title = "Slack!";

                    //ADICIONAR CONTRIBUIDOR AO MODAL
                    modal.find('.modal-body .contribuidores').append(newH6_Aux);
                });
            }).catch(console.log.bind(console));
        }).catch(console.log.bind(console));


        //PESQUISA DOS COMMITS DO PROJETO ESPECÍFICO PARA ADIÇÃO AO FEED DE NOTÍCIAS DO MODAL
        getData("http://localhost:8080/gitlab/projects/" + modalProjectID + "/repository/commits", "GET").done(handleData).then(function(data){
            var commits = data;

            //PARA CADA EVENTO, CRIA-SE O HTML PARA POSTERIOR ADIÇÃO AO FEED DE NOTICIAS
                /*MODELO ATUAL:
                        <div class="list-group-item list-group-item-action flex-column align-items-start" href="#">
                            <div class="d-flex w-100 justify-content-between">
                                <h5 class="mb-1">${commit.author_name}</h5>
                                <small>${commit.created_at}</small>
                            </div>
                            <p class="mb-1">${commit.message}</p>
                        </div>
                */
            var feedCommits = $(".projetos .feed-box .feed-commits")[0];
            commits.forEach(function (commit) {
                var div = document.createElement("div");
                div.setAttribute("class", "list-group-item list-group-item-action flex-column align-items-start");
                div.setAttribute("href", "#");
        
                var div2 = document.createElement("div");
                div2.setAttribute("class", "d-flex w-100 justify-content-between");
                div.appendChild(div2);
        
                var h5 = document.createElement("h5");
                h5.setAttribute("class", "mb-1");
                h5.innerText = commit.author_name;                                                                      //${commit.author_name}
                div2.appendChild(h5);

                var p = document.createElement("p");
                p.setAttribute("class", "mb-1");
                p.innerText += commit.message;                                                                          //${commit.message}
                div.appendChild(p);
        
                var small = document.createElement("small");
                var dias = (parseInt(calcularDias(commit.created_at)) - 1);
        
                if (dias <= 7) {
                    small.innerText = "Há " + dias + " dia";
                    if (dias != 1)
                        small.innerText += "s";
                } else
                    small.innerText = (commit.created_at.substring(8, 10) + "/" + commit.created_at.substring(5, 7) + "/" + commit.created_at.substring(0, 4));
        
                div2.appendChild(small);                                                                                //${commit.created_at}

                
                //ADICIONAR COMMIT AO FEED DO MODAL
                feedCommits.appendChild(div);
            });

            //FUNÇÃO QUE ADICIONA IDEIAS AO MODAL DE PROJETO
            getData("http://localhost:8080/ideas/project/" + modalProjectID, "GET").done(handleData).then(function(data){
                var ideias = data;
                
                //PARA CADA IDEIA, CRIA-SE O HTML PARA POSTERIOR ADIÇÃO AO MODAL
                    /*MODELO ATUAL:
                        <div class="list-group-item list-group-item-action flex-column align-items-start" href="#">
                            <div class="d-flex w-100 justify-content-between">
                                <h5 class="mb-1">${ideia.name}</h5>
                                <small>${ideia.createdAt}</small>
                            </div>
                            <div class="row justify-content-end">
                                <div class="col-md-6">
                                    <p class="author">${ideia.email}</p>
                                </div>
                            </div>
                            <p class="event-description">${ideia.description}</p>
                        </div>
                    */
                if (ideias.length != 0){
                    var feedIdeias = $(".projetos .feed-box .feed-idea")[0];
                    ideias.forEach(function (ideia) {

                        var div = document.createElement("div");
                        div.setAttribute("class", "list-group-item list-group-item-action flex-column align-items-start");
                        div.setAttribute("href", "#");
                
                        var div2 = document.createElement("div");
                        div2.setAttribute("class", "d-flex w-100 justify-content-between");
                        div.appendChild(div2);
            
                        var div3 = document.createElement("div");
                        div3.setAttribute("class", "row justify-content-end");
                        div.appendChild(div3);
            
                        var div5 = document.createElement("div");
                        div5.setAttribute("class", "col-md-6");
                        div3.appendChild(div5);
                        
                        var p2 = document.createElement("p");
                        p2.setAttribute("class", "mb-1");
                        p2.setAttribute("class", "author");
            
                        p2.innerText = ideia.email;                                                                 //${ideia.email}
                        div5.appendChild(p2);                                                                          
                
                        var h5 = document.createElement("h5");
                        h5.setAttribute("class", "mb-1");
                        h5.innerText = ideia.name;                                                                  //${ideia.name}
                        div2.appendChild(h5);

                        var p = document.createElement("p");
                        p.setAttribute("class", "mb-1");
                        p.setAttribute("class", "event-description");
                        p.innerText = ideia.description;                                                            //${ideia.description}
                        div.appendChild(p);
                
                        var small = document.createElement("small");                
                        var dias = parseInt(calcularDias(ideia.createdAt));
                        if (dias <= 7) {
                            small.innerText = "Há " + dias + " dia";
                            if (dias != 1)
                                small.innerText += "s";
                        } else
                            small.innerText = (ideia.createdAt.substring(8, 10) + "/" + ideia.createdAt.substring(5, 7) + "/" + ideia.createdAt.substring(0, 4));
                        
                        if (dias == 0)
                            small.innerText = "Hoje";

                        div2.appendChild(small);                                                                      //${ideia.createdAt}
        
                        
                        //ADICIONAR IDEIA AO MODAL
                        feedIdeias.appendChild(div);
                    });
                } else{
                    //DEIXAR O NAVEGADOR DE IDEIAS DISABLED - CASO NÃO TENHA NENHUMA
                    $("#home-tab").addClass('disabled');
                    $("#home-tab").addClass('color-disabled');
                }
            });

            $("#home-commits").click();
        }).catch(console.log.bind(console));
    }).on('hidden.bs.modal', function (event) {
        //ADIÇÃO DE PROMISE PARA LIMPAR INFORMAÇÕES DO MODAL AO FECHAR
        $(this).find('.modal-body .contribuidores').text('');
        $(this).find('.modal-body .feed-box .feed-commits').text('');
        $(this).find('.modal-body .feed-box .feed-idea').text('');
        $("#btn-gitlab").off();
        $("#home-tab").removeClass('disabled');
        $("#home-tab").removeClass('color-disabled');
    });

//********************************* FIM---->  FUNÇÃO QUE ADICIONA INFORMAÇÕES AO MODAL DE PROJETOS EM (SECTION-PROJETOS)

//********************************* INICIO---->   FUNÇÕES QUE INICIALIZAM E CONTROLAM O POPOVER DE DENTRO DO MODAL EM (SECTION-PROJETOS)
    function modalHidePopover(){
        $("#btn-ideia").popover("hide");
    }

    //ABRIR POPOVER ONCLICK E FUNÇÃO PARA ESCONDER/FECHAR AO CLICAR EM QUALQUER LUGAR DA MODAL
    $("#btn-ideia").popover({
        html: true,
        container: $(".modal-content"),
        title: "Deixe sua ideia para este projeto:",
        content: function () {
            return $('#popover-content').html();
        }
    }).on('show.bs.popover', function () {
        $(this).tooltip('hide');
    }).on('shown.bs.popover', function(){
        $(".projetos").on("click", ".modal-content" , modalHidePopover);

        $(".popover.show").click(function(){
            $(".projetos").off("click", ".modal-content" , modalHidePopover);
            setTimeout(function() {
                $(".projetos").on("click", ".modal-content" , modalHidePopover);
            }, 300);
        });
    }).on('hidden.bs.popover', function(){
        $(".projetos").off("click", ".modal-content" , modalHidePopover);
    });

    //FUNÇÃO DO BOTÃO CANCELAR
    $(".modal-content").on('click', '#btn-idea-cancel', function () {
        $("#btn-ideia").popover("hide");
    });
    
    //ENVIAR INFORMAÇÕES POR AJAX AO SERVIDOR DO BANCO DE DADOS E FEEDBACK AO USUÁRIO
    $(".modal-content").on('click', '#btn-idea-submit', function () {
        if ($('.popover.show #needs-validation')[0].checkValidity() === false){
            $('.popover.show #needs-validation')[0].setAttribute("class", "was-validated");
            return;
        }

        var data = {
            "projectId": $("#id-popover").val(),
            "status": "Ativo",
            "description": $('.popover.show #textarea-idea').val(),
            "email": $('.popover.show #email-idea-popover').val(),
            "name": $('.popover.show #nome-idea-popover').val()
        }

        $.ajax({
            url: 'http://localhost:8080/ideas',
            type: 'post',
            async: false,
            data: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            success: function (data) {
                
                $("#btn-ideia")[0].nextElementSibling.innerHTML = '<form class="form" role="form"><div class="form-group" id="form-group-popover-2"><h3>Sua ideia foi submetida com sucesso!</h3></div></form>';

                $("#btn-ideia").popover("show");
                $('.popover.show .popover-header')[0].innerText = '';

                setTimeout(function () {
                    $("#btn-ideia").popover("hide");
                    $("#btn-ideia")[0].nextElementSibling.innerHTML = '<form id="needs-validation" novalidate><input class="form-control" type="hidden" name="id-popover" id="id-popover"><label for="nome-popover">Nome:</label><input class="form-control " type="text" name="nome-popover" id="nome-idea-popover" required><div class="invalid-feedback email-validated">Ow, amigão. Me diga quem você é!</div><label for="email-popover">Email:</label><input class="form-control " type="text" name="email-popover" id="email-idea-popover" required><div class="invalid-feedback email-validated">Por favor, digite seu e-mail</div><label for="ideia-popover">Ideia:</label><textarea class="form-control " name="idea-popover" id="textarea-idea" cols="30" rows="10" required></textarea><div class="invalid-feedback">Não esqueça de deixar sua ideia :)</div><button type="button" id="btn-idea-cancel" class="btn btn-danger">Cancelar</button><button type="button" id="btn-idea-submit" class="btn btn-outline-primary">Submeter ideia</button></form>'
                }, 2000)
            },
            error: function (error) {
                $("#btn-ideia")[0].nextElementSibling.innerHTML = '<form class="form" role="form"><div class="form-group" id="form-group-popover-2"><h3>Ocorreu um erro! Favor tentar novamente em instantes.</h3></div></form>';

                $("#btn-ideia").popover("show");
                $('.popover.show .popover-header')[0].innerText = '';

                setTimeout(function () {
                    $("#btn-ideia").popover("hide");
                    $("#btn-ideia")[0].nextElementSibling.innerHTML = '<form id="needs-validation" novalidate><input class="form-control" type="hidden" name="id-popover" id="id-popover"><label for="nome-popover">Nome:</label><input class="form-control " type="text" name="nome-popover" id="nome-idea-popover" required><div class="invalid-feedback email-validated">Ow, amigão. Me diga quem você é!</div><label for="email-popover">Email:</label><input class="form-control " type="text" name="email-popover" id="email-idea-popover" required><div class="invalid-feedback email-validated">Por favor, digite seu e-mail</div><label for="ideia-popover">Ideia:</label><textarea class="form-control " name="idea-popover" id="textarea-idea" cols="30" rows="10" required></textarea><div class="invalid-feedback">Não esqueça de deixar sua ideia :)</div><button type="button" id="btn-idea-cancel" class="btn btn-danger">Cancelar</button><button type="button" id="btn-idea-submit" class="btn btn-outline-primary">Submeter ideia</button></form>'
                }, 2000)
            }
        })
    });

    $(".modal-content").on('click', '#btn-idea-close-after', function () {
        $("#btn-ideia").popover("hide");
    });

    //TOOLTIPS PARA BOTÕES DO MODAL. FOI NECESSARIO A ALTERAÇÃO PARA UTILIZAÇÃO DO TOOLTIP PADRÃO NO FORMATO ACIMA
    $("#btn-ideia").tooltip({
        container: $(".modal-content"),
        placement: 'right',
        title: "Tenho uma ideia!"
    });

    $("#btn-gitlab").tooltip({
        container: $(".modal-content"),
        placement: 'bottom',
        title: "Abrir GitLab!"
    });
//********************************* FIM---->   FUNÇÕES QUE INICIALIZAM E CONTROLAM O POPOVER DE DENTRO DO MODAL EM (SECTION-PROJETOS)
});