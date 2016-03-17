var items = [{
    name: "Ноутбук Acer Aspire ES1-520-35F2 черный",
    description: "[HD, 1366x768, TN+film, AMD E1 2500, 2x1.4 ГГц, RAM 2 Гб, HDD 500 Гб, Radeon HD 8240, Wi-Fi, BT, Win 8.1]",
    price: "20000",
    img: "img/notebook.jpg"
}, {
    name: "Ноутбук Acer Aspire ES1-520-35F2 черный",
    description: "[HD, 1366x768, TN+film, AMD E1 2500, 2x1.4 ГГц, RAM 2 Гб, HDD 500 Гб, Radeon HD 8240, Wi-Fi, BT, Win 8.1]",
    price: "20000",
    img: "img/notebook.jpg"
}, {
    name: "Ноутбук Acer Aspire ES1-520-35F2 черный",
    description: "[HD, 1366x768, TN+film, AMD E1 2500, 2x1.4 ГГц, RAM 2 Гб, HDD 500 Гб, Radeon HD 8240, Wi-Fi, BT, Win 8.1]",
    price: "20000",
    img: "img/notebook.jpg"
},{
    name: "Ноутбук Acer Aspire ES1-520-35F2 черный",
    description: "[HD, 1366x768, TN+film, AMD E1 2500, 2x1.4 ГГц, RAM 2 Гб, HDD 500 Гб, Radeon HD 8240, Wi-Fi, BT, Win 8.1]",
    price: "20000",
    img: "img/notebook.jpg"
},{
    name: "Ноутбук Acer Aspire ES1-520-35F2 черный",
    description: "[HD, 1366x768, TN+film, AMD E1 2500, 2x1.4 ГГц, RAM 2 Гб, HDD 500 Гб, Radeon HD 8240, Wi-Fi, BT, Win 8.1]",
    price: "20000",
    img: "img/notebook.jpg"
}
];

$(function() {

    $("#jsGrid").jsGrid({
        height: "auto",
        width: "100%",

        paging: true,
        autoload: true,
        selecting: false,

        data: items,

        rowRenderer: function(item) {
            var $img = $("<div>").append($("<img>").addClass("product-image").attr("src", item.img));
            var $info = $("<div>").addClass("product-info")
                .append($("<p>").text(item.name))
                .append($("<p>").text(item.description))
                .append($("<p>").text(item.price + "₽"));

            return $("<tr>").append($("<td>").append($img).append($info));
        },

        fields: [
            { title: "Ноутбуки" }
        ]
    });

});