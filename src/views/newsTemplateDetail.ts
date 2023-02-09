import { News } from '../news/news.interface';
export const newsTemplateDetail = (news: News, comments) => {
  let commentsHtml = `
    <div class="card text-left mt-3">
        <div class="card-body">
          <h5 class="text-uppercase">Добавить комментарий:</h5>
          <textarea class="text-left" id ="userComment" rows="4" cols="35" name="comment"></textarea><br>
          <button id="submit" type="button" class="btn btn-outline-dark mb-2">
            Добавить
          </button>
          <script>
            function submit() {
              const comment = document.getElementById("userComment");
              if (comment?.value !== "") {
                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
                const urlencoded = new URLSearchParams();
                urlencoded.append("text", comment.value);
                const requestOptions = {
                  method: 'POST',
                  headers: myHeaders,
                  body: urlencoded,
                  redirect: 'follow'
                };
                fetch("http://localhost:3000/news-comments/create/?idNews=${news.id}", requestOptions)
                  .then(response => response.text())
                  .then(result => console.log(result))
                  .catch(error => console.log('error', error));
              }
            }
            document.getElementById("submit").addEventListener("click", submit);
          </script>
        </div>
        <div class="card-body">
          <h5 class="text-uppercase">Комментарии:</h5>
  `;

  if (comments != null) {
    for (const commentsItem of comments) {
      let commentsReplyHtml = `
          <div class="card-body">
            <h5 class="text-uppercase">Ответы:</h5>
        `;
      if (commentsItem?.['reply']) {
        for (const commentsItemReply of commentsItem.reply) {
          commentsReplyHtml += `
            <p class="mb-0">${commentsItemReply.comment.text}</p>
          `;
        }

        commentsReplyHtml += `</div>`;
      }

      commentsHtml += `
      <div class="card text-left mt-3">
        <div class="card-body">
          <p>${commentsItem.comment.text}</p>
          <textarea class="text-left" id ="userCommentReply${commentsItem.id}" rows="4" cols="50" name="comment"></textarea><br>
          <button id="reply${commentsItem.id}" type="button" class="btn btn-outline-dark mb-2">
            Ответить
          </button>
          <script>
              function reply() {
                const comment = document.getElementById("userCommentReply${commentsItem.id}");
                if (comment?.value !== "") {
                  const myHeaders = new Headers();
                  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
                  const urlencoded = new URLSearchParams();
                  urlencoded.append("text", comment.value);
                  const requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: urlencoded,
                    redirect: 'follow'
                  };
                  fetch("http://localhost:3000/news-comments/${commentsItem.id}/reply", requestOptions)
                    .then(response => response.text())
                    .then(result => console.log(result))
                    .catch(error => console.log('error', error));
                }
                }
               
              document.getElementById("reply${commentsItem.id}").addEventListener("click", reply);
            </script>
            ${commentsReplyHtml}
         </div>
      </div>

      `;
    }
    commentsHtml += '</div></div>';
  } else {
    commentsHtml += `
          <h5 class="text-secondary">Для этой новости комментариев нет</h5>
        </div>
      </div>
    `;
  }

  const html = `
    <div class="card align-items-center">
      <div class="card-body">
        <h2 class="text-uppercase">${news.title}</h2>
        <h6 class="card-subtitle mb-2 text-muted">  
          Автор: ${news.author}
        </h6>
        <h6 class="card-subtitle text-muted">
          Дата создания: ${news.createdAt.toLocaleString()}
        </h6>
        <p class="card-text mt-3">${news.description}</p>
        <a href="http://localhost:3000/news">
          <button type="button" class="btn btn-dark mb-2">
            К новостям
          </button>
        </a>
      </div>
    </div>

    ${commentsHtml}
  `;

  return html;
};
