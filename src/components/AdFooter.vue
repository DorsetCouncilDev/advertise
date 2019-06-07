<template> 
 <footer id="dcFooter">
                <div class="container">
                        <div class="footer-items">
                                <nav class="link-section" aria-labelledby="servicesInfoLinksLabel">
                                        <h2 id="servicesInfoLinksLabel">Services and information</h2>

                                        <ul class="services-info-list">
                                                <li><a href="https://www.dorsetcouncil.gov.uk/bins-recycling-and-litter/bins-recycling-and-litter.aspx">Bins and waste</a></li>
                                                <li><a href="https://www.dorsetcouncil.gov.uk/housing/housing.aspx">Housing</a></li>
                                                <li><a href="https://www.dorsetcouncil.gov.uk/sport-leisure/sport-and-leisure.aspx?folderIds=2058,10460">Leisure Centres</a></li>
                                                <li><a href="https://www.dorsetcouncil.gov.uk/travel/travel.aspx">Travel information</a></li>
                                                <li><a href="https://www.dorsetcouncil.gov.uk/council-tax/council-tax.aspx">Council tax</a></li>
                                                <li><a href="https://www.dorsetcouncil.gov.uk/roads-highways-maintenance/roads-highways-and-maintenance.aspx">Highways</a></li>
                                                <li><a href="https://www.dorsetcouncil.gov.uk/planning-buildings-land/planning-buildings-and-land.aspx">Planning</a></li>
                                                <li><a href="https://www.dorsetcouncil.gov.uk/education-and-training/schools-and-learning/schools-and-learning.aspx">Schools</a></li>
                                                <li><a href="https://www.dorsetcouncil.gov.uk/libraries-history-culture/libraries/libraries.aspx">Libraries</a></li>
                                                <li><a href="https://www.dorsetcouncil.gov.uk/benefits/benefits.aspx">Benefits</a></li>
                                                <li><a href="https://www.dorsetcouncil.gov.uk/children-families/children-and-families.aspx">Children</a></li>
                                                <li><a href="https://www.dorsetcouncil.gov.uk/care-and-support-for-adults/care-and-support-for-adults.aspx">Adult care</a></li>
                                        </ul>
                                </nav>

                                <nav class="link-section" aria-labelledby="councilLinksLabel">
                                        <h2 id="councilLinksLabel">Your council</h2>
                                        <ul class="council-links-list">
                                                <li><a href="https://www.dorsetcouncil.gov.uk/councillors-committees-elections/councillors-committees-and-elections.aspx">Councillors and Committees</a></li>
                                                <li><a href="https://www.dorsetcouncil.gov.uk/jobs">Jobs</a></li>
                                                <li><a href="https://www.dorsetcouncil.gov.uk/news">News</a></li>
                                                <li><a href="https://www.dorsetcouncil.gov.uk/e-news">E-newsletter sign up</a></li>
                                                <li><a href="https://www.dorsetcouncil.gov.uk/mylocal/">My Local</a></li>
                                                <li><a href="https://www.dorsetcouncil.gov.uk/your-council/online-payments/online-payments.aspx">Pay online</a></li>
                                                <li><a href="https://www.dorsetcouncil.gov.uk/your-council/about-your-council/data-protection.aspx">Data protection</a></li>
                                        </ul>
                                </nav>
                        </div>
                        <div class="footer-common-links">
                                <img src="../assets/images/dorsetcouncil-logo.svg" class="footer-logo" alt="Dorset Council Home">
                                <div class="common-links-block">
                                        <nav>
                                                <ul class="common-links-list">
                                                        <li><a href="https://www.dorsetcouncil.gov.uk/footer/about-dorsetforyou.aspx">About</a></li>
                                                        <li><a href="https://www.dorsetcouncil.gov.uk/footer/accessibility-statement.aspx">Accessibility</a></li>
                                                        <li><a href="https://www.dorsetcouncil.gov.uk/contact/contacts.aspx">Contact</a></li>
                                                        <li><a href="https://www.dorsetcouncil.gov.uk/footer/downloads.aspx">Downloads</a></li>
                                                        <li><a href="https://www.dorsetcouncil.gov.uk/footer/privacy-and-cookies-policy.aspx">Privacy policy</a></li>
                                                        <li><a href="https://www.dorsetcouncil.gov.uk/footer/terms-and-conditions.aspx">Terms &amp; conditions</a></li>
                                                        <li><a href="https://translate.google.com/">Translate</a>&nbsp;</li>
                                                </ul>
                                        </nav>
                                        <nav>
                                                 <ul class="social-links-list">
                                                        <li class="social-list-item"><a href="https://www.dorsetcouncil.gov.uk/facebook" title="Facebook" alt="Dorset council facebook" target="_blank" class="fa fa-facebook-square">
                                                            <span class="visuallyhidden">Facebook</span></a>
                                                        </li>
                                                        <li class="social-list-item"><a href="https://www.dorsetcouncil.gov.uk/twitter" title="Twitter" alt="Dorset council twitter" target="_blank" class="fa fa-twitter">
                                                            <span class="visuallyhidden">Twitter</span></a>
                                                        </li>
                                                        <li class="social-list-item">
                                                                <a href="https://www.dorsetcouncil.gov.uk/instagram" title="Instagram" alt="Dorset council instagram" target="_blank" class="fa fa-instagram">
                                                            <span class="visuallyhidden">Instagram</span></a>
                                                        </li>
                                                        <li class="social-list-item"><a href="https://www.dorsetcouncil.gov.uk/youtube" title="YouTube" alt="Dorset council youtube" target="_blank" class="fa fa-youtube-play">
                                                            <span class="visuallyhidden">YouTube</span></a>
                                                        </li>
                                                        <li class="social-list-item"><a href="https://www.dorsetcouncil.gov.uk/flickr" title="Flickr" alt="Dorset council flickr" target="_blank" class="fa fa-flickr">
                                                            <span class="visuallyhidden">Flickr</span></a>
                                                        </li>
                                            </ul>
                                        </nav>
                                </div>
                        </div>
                </div>
        </footer>
</template>

<script>
    export default {
        name: 'AdFooter'
    }

</script>

<style scoped lang="scss">


#dcFooter {
    margin-top: 60px;
    padding: 60px 15px 15px 15px;
    background-color: #f2f2f2;

    .footer-items {
        display: flex;
    }

    #servicesInfoLinksLabel,
    #councilLinksLabel {
        font-weight: 700;
        color: rgb(92, 96, 107);
        font-size: 25px;
    }

    .services-info-list,
    .council-links-list,
    .common-links-list,
    .social-links-list {
        list-style: none;
        padding-left: 0;
    }

    .council-links-list,
    .common-links-list {
        li {
            margin-top: 12px;
        }
    }

    .common-links-list,
    .social-links-list {
        display: flex;
        flex-wrap: wrap;
        margin-bottom:30px;

        li {
            margin-right: 30px;
            .fa{font-size: 24px;

            }
        }
    }

    .council-links-list {
        width: 500px;
    }

    .services-info-list {
        column-count: 2;
        width: 400px;
        display: block;

        li:not(:first-of-type) {
            margin-top: 12px;
        }
    }

    a {
        color: #206497;
        text-decoration: underline;
        font-size: 15px;
    }

    .common-links-block {
        display: flex;
    }

    .social-list-item {
        margin-right: 25px;
        a{
            color: #cb436a;
            text-decoration:none;
        }
    }

    .visuallyhidden {
        clip: rect(1px, 1px, 1px, 1px);
        height: 1px;
        overflow: hidden;
        position: absolute !important;
        width: 1px;
        left: 0;
    }

    .footer-common-links {
        display: flex;

        .footer-logo {
            margin-right: 50px;
            height: 70px;
            margin-top: 10px;
        }
    }

    .common-links-list {
        display: flex;
        width: 500px;
        flex-wrap: wrap;

        li {
            margin-right: 20px;
        }
    }
}

@media only screen and (max-width: 970px) {
    #dcFooter {
        flex-direction: column;
        padding: 30px 15px;

        .footer-items {
            flex-direction: column;
        }

        #servicesInfoLinksLabel,
        #councilLinksLabel {
            font-size: 20px;
        }

        .services-info-list,
        .council-links-list,
        .common-links-list {
            flex-direction: column;
            width: auto;
        }

        .services-info-list {
            column-count: 1;
            width: auto;
        }

        .footer-common-links {
            flex-direction: column;
            flex-direction: column-reverse;
        }

        .common-links-block {
            flex-direction: column;
        }

        .footer-logo {
            width: 150px;
            margin-top: 15px;
        }
    }
}

</style>
