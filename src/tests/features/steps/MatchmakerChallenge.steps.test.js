import { loadFeature, defineFeature } from 'jest-cucumber'
import puppeteer from 'puppeteer'

const feature = loadFeature('./src/tests/features/MatchmakerChallenge.feature')
jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000

const FORM_SELECTOR = '.formInput'
const EMAIL_SELECTOR = '.emailInput'
const PW_SELECTOR = '.pwInput'
const SUBMIT_LOGIN_SELECTOR = '.MuiButtonBase-root-197'
const USERS_BUTTON = 'div.MuiGrid-typeItem-39:nth-child(2) > a:nth-child(1) > button:nth-child(1)'

defineFeature(feature, (test) => {
  let browser
  let page

  beforeEach(async () => {
    browser = await puppeteer.launch({ headless: false, slowMo: 10 })
    page = await browser.newPage()
  })

  test('Succesful challenge', ({ given, when, then, pending }) => {
    given('I log into matchmaker page', async () => {
      await page.goto('http://localhost:3000/')
      await page.click(EMAIL_SELECTOR)
      await page.keyboard.type('8antonm@gmail.com')
      await page.click(PW_SELECTOR)
      await page.keyboard.type('asdasd')
      await page.click(SUBMIT_LOGIN_SELECTOR)
      await page.waitFor(3000)

      const button = await page.waitForSelector(USERS_BUTTON)
      expect(button).toBeTruthy()
    })

    // when('I choose all opponents', async () => {
    //   // pending()
    // })

    // when('I view a single opponents profile', async () => {
    //   // pending()
    // })

    // when('If i can challenge them', async () => {
    //   // pending()
    // })

    // then('I can send a challenge', async () => {
    //   // pending()
    // })

  })

  afterAll(async () => {
    await browser.close()
  })
})
