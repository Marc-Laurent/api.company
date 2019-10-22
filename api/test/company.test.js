import chai from 'chai'
import chaiHttp from 'chai-http'
import chaiNock from 'chai-nock'
import chaiAsPromised from 'chai-as-promised'
import app from '../app'

let expect = chai.expect,
    should = chai.should()

chai.use(chaiHttp)
chai.use(chaiNock)
chai.use(chaiAsPromised)

describe('Find company phone number', () => {

    /** GET Search param
     * 
     * QUERY param name
     * RESPONSE 200 with return phone
     *
    */
    it('Test GET', (done) => {

        chai.request(app)
            .get('/api/company/search?name=EXPERDECO')
            .send()
            .end((err, doc) => {

                should.not.exist(err)
                should.exist(doc)
                expect(doc).to.be.a('object')
                expect(doc).to.have.status(200)

                should.exist(doc.res)
                expect(doc.body).to.be.a('object')
                should.exist(doc.body.phone)
                expect(doc.body.phone).to.be.a('string').to.equal('+33 4 50 34 63 54')

                done()
            })
    })
})