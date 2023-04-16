const product = {
    crazy: {
        name: 'Crazy',
        price: 31000,
        img: 'images/products/burger-1.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount;
        }
    },
    light: {
        name: 'Light',
        price: 26000,
        img: 'images/products/burger-2.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount;
        }
    },
    cheeseburger: {
        name: 'CheeseBurger',
        price: 29000,
        img: 'images/products/burger-3.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount;
        }
    },
    dburger: {
        name: 'dBurger',
        price: 24000,
        img: 'images/products/burger-4.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount;
        }
    }
}


const productBtns = document.querySelectorAll('.wrapper__list-btn'),
    basketBtn = document.querySelector('.wrapper__navbar-btn'),
    basketModal = document.querySelector('.wrapper__navbar-basket'),
    basketModalClose = document.querySelector('.wrapper__navbar-close'),
    basketModalChecklist = document.querySelector('.wrapper__navbar-checklist'),
    basketModalTotalPrice = document.querySelector('.wrapper__navbar-totalprice'),
    basketModalTotalAmount = document.querySelector('.warapper__navbar-count'),
    basketOrder = document.querySelector('.wrapper__navbar-bottom')


basketBtn.addEventListener('click', () => {
    basketModal.classList.add('active')
})

basketModalClose.addEventListener('click', () => {
    basketModal.classList.remove('active')
})



productBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        addProduct(this)
    })
})


function addProduct(btn) {
    // closest - это метод, который позволяет найти ближайший родительский элемент
    // getAttribute - это метод, который позволяет получить значение атрибута
    let parent = btn.closest('.wrapper__list-card')
    let parentId = parent.getAttribute('id')
    product[parentId].amount++
    renderBasket()
}

// toLowerCase() - это метод, который позволяет привести строку к нижнему регистру

function renderBasket() {
    const productArray = []
    for (const key in product) {
        const productItem = product[key]
        const productCard = document.querySelector(`#${productItem.name.toLowerCase()}`)
        const productAmount = productCard.querySelector('.wrapper__list-count')
        if (productItem.amount) {
            productArray.push(productItem)
            productAmount.classList.add('active')
            productAmount.innerHTML = productItem.amount
        } else {
            productAmount.classList.remove('active')
            productAmount.innerHTML = 0
        }
    }
    basketModalChecklist.innerHTML = ''
    productArray.forEach(item => {
        basketModalChecklist.innerHTML += cardItemProduct(item)
    })

    let allCount = totalCountProduct()

    if (allCount) {
        basketModalTotalAmount.classList.add('active')
        basketModalTotalAmount.innerHTML = allCount
    } else {
        basketModalTotalAmount.classList.remove('active')
        basketModalTotalAmount.innerHTML = 0
    }

    basketModalTotalPrice.innerHTML = totalSumProduct()
}


function totalCountProduct() {
    let total = 0
    for (const key in product) {
        total += product[key].amount
    }
    return total
}

function totalSumProduct() {
    let total = 0
    for (const key in product) {
        total += product[key].totalSum
    }
    return total
}

function cardItemProduct(obj) {
    const { name, price, img, amount } = obj

    return `
        <div class="wrapper__navbar-product">
            <div class="wrapper__navbar-info">
                <img src="${img}" alt="${name}" class="wrapper__navbar-productImage">
                <div class="wrapper__navbar-productInfo">
                    <p class="wrapper__navbar-infoName">${name}</p>
                    <p class="wrapper__navbar-infoPrice">${price}</p>
                </div>
            </div>
            <div class="wrapper__navbar-option" id="${name.toLowerCase()}_card">
                <button class="wrapper__navbar-symbol" data-symbol="-">-</button>
                <span class="wrapper__navbar-count">${amount}</span>
                <button class="wrapper__navbar-symbol" data-symbol="+">+</button>
            </div>
        </div>
    `
}

// contains() - это метод, который позволяет проверить, есть ли у элемента класс

window.addEventListener('click', (e) => {
    if (e.target.classList.contains('wrapper__navbar-symbol')) {
        const attr = e.target.getAttribute('data-symbol')
        const parent = e.target.closest('.wrapper__navbar-option')
        if (parent) {
            const parentId = parent.getAttribute('id').split('_')[0]
            if (attr === '+') product[parentId].amount++
            else if (attr === '-') product[parentId].amount--
            renderBasket()
        }
    }
})

const printWrapper = document.querySelector('.print__wrapper'),
    print = document.querySelector('.print'),
    printBody = document.querySelector('.print__body'),
    printFooter = document.querySelector('.print__footer')


basketOrder.addEventListener('click', () => {
    printBody.innerHTML = ''
    for (const key in product) {
        const { name, totalSum, amount } = product[key]
        if (amount) {
            printWrapper.classList.add('active')
            print.classList.add('active')
            basketModal.classList.remove('active')
            printBody.innerHTML += `
                <div class="print__body-item">
                    <p class="print__body-item_name">
                        <span>${name}</span>
                        <span>${amount} шт</span>
                    </p>
                    <p>${totalSum}</p>
                </div>
            `
            printFooter.innerHTML = `Общая стоимость: ${totalSumProduct()}`
        }
        product[key].amount = 0
        renderBasket()
    }
    setTimeout(() => {
        printWrapper.classList.remove('active')
        print.classList.remove('active')
    }, 5000);
})

