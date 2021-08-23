
    function loadImage (url) {
        return new Promise(resolve => {
            const img = new Image();
            img.addEventListener('load', () => {
                resolve(img);
            });
            img.src = url;
        });
    }

    function draw (url, x, y) {
        loadImage(url)
        .then(img => {
            ctx.drawImage(img, x, y);
        });
    }

    function buidGrid (columns, rows) {
        return new Array(columns).fill(null)
          .map(() => new Array(rows).fill(0));
    }

    function Vec2(x, y) {
        let Vec2 = {x, y};
        return Vec2;
    }
