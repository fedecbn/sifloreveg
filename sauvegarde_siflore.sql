--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

SET search_path = public, pg_catalog;

--
-- Data for Name: fos_user_group; Type: TABLE DATA; Schema: public; Owner: siflore
--

COPY fos_user_group (id, name, roles) FROM stdin;
\.


--
-- Name: fos_user_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: siflore
--

SELECT pg_catalog.setval('fos_user_group_id_seq', 7, true);


--
-- Data for Name: fos_user_user; Type: TABLE DATA; Schema: public; Owner: siflore
--

COPY fos_user_user (id, username, username_canonical, email, email_canonical, enabled, salt, password, last_login, locked, expired, expires_at, confirmation_token, password_requested_at, roles, credentials_expired, credentials_expire_at, created_at, updated_at, date_of_birth, firstname, lastname, website, biography, gender, locale, timezone, phone, facebook_uid, facebook_name, facebook_data, twitter_uid, twitter_name, twitter_data, gplus_uid, gplus_name, gplus_data, token, two_step_code) FROM stdin;
152	j_millet	j_millet	jerome.millet@fcbn.fr	jerome.millet@fcbn.fr	t	jkpe6j5i03k0kkg8ogcwwsos0oswgg0	+p0KkvssImmyYzLuyQpHVpa4vTctRV+lpH9H7m9+ekSTP0oJ2BhGIE5WVlHWM3juAFHZlryXGjNY6UmG2XEqCA==	\N	f	f	\N	\N	\N	a:0:{}	f	\N	2015-06-24 15:44:22	2015-06-24 15:44:22	\N	Jérôme	MILLET	\N	\N	u	\N	\N	\N	\N	\N	null	\N	\N	null	\N	\N	null	\N	\N
107	p_antonetti	p_antonetti	philippe.antonetti@cbnmc.fr	philippe.antonetti@cbnmc.fr	t	lcllhwylny80o4cwwc8cg0o4wkck08c	+Ip5BqPqEz5E4Kwgc+jye7aXImXX3q9Wsenl/t7mRgSD2w5KAstx5R6ykMr+RxkUulE3ixATAxAQ75DacHzX/Q==	\N	f	f	\N	\N	\N	a:0:{}	f	\N	2015-06-24 15:32:32	2015-06-24 15:32:32	\N	Philippe	ANTONETTI	\N	\N	u	\N	\N	\N	\N	\N	null	\N	\N	null	\N	\N	null	\N	\N
108	g_bailly	g_bailly	gilles.bailly@cbnfc.org	gilles.bailly@cbnfc.org	t	p7kq1ef5rhck404wcok0wo0480c0wos	EtE836J24+Vji4SVXNrbT7j9/ODkKA7WFHj1I7KjTYf5VJj+tiKTsQ1X6hr4uJLL8IbVH/ogRLZR+vwZA8iVug==	\N	f	f	\N	\N	\N	a:0:{}	f	\N	2015-06-24 15:32:57	2015-06-24 15:32:57	\N	Gilles	BAILLY	\N	\N	u	\N	\N	\N	\N	\N	null	\N	\N	null	\N	\N	null	\N	\N
105	admin	admin	anais.just@fcbn.fr	anais.just@fcbn.fr	t	d1njgqyrmeosgk8g4c88cwksko0kgg0	+qJkjm1ZwlGHF1TaqOnkXdHSdKau7ueF1UrBUPQEKzPYIrYYOMl54AuWvf7UXUDdwxgIoPat4KMwhFcnpbMsCA==	2015-06-24 15:23:36	f	f	\N	\N	\N	a:1:{i:0;s:16:"ROLE_SUPER_ADMIN";}	f	\N	2015-06-24 11:32:34	2015-06-24 15:23:36	\N	Anaïs	Just	\N	\N	u	\N	\N	\N	\N	\N	null	\N	\N	null	\N	\N	null	\N	\N
109	c_bougault	c_bougault	c.bougault@cbnbrest.com	c.bougault@cbnbrest.com	t	ntsenctcbtwwcoskgg8skcckoc8w4gc	u+ZcP+WmPHKOzmfIuQ3L/+QCWlf8FN1BsX/yLttN2RO3UnLu2HL9Kgzw8got5EqLTYfWx2eam+pJSIwG0+J68w==	\N	f	f	\N	\N	\N	a:0:{}	f	\N	2015-06-24 15:32:57	2015-06-24 15:32:57	\N	Christophe	BOUGAULT	\N	\N	u	\N	\N	\N	\N	\N	null	\N	\N	null	\N	\N	null	\N	\N
110	v_boullet	v_boullet	vincent.boullet@cbnmc.fr	vincent.boullet@cbnmc.fr	t	is99p0iopyoss8gkwg0o8wsok40ok40	M04afAtq0GzyrxNJ/Gsqmbr/sC9k/wio4khahungCDwcII3FJEGBrSvj2bJnX6gDG/sRb5mIuMhm9udRMRs5+Q==	\N	f	f	\N	\N	\N	a:0:{}	f	\N	2015-06-24 15:32:57	2015-06-24 15:32:57	\N	Vincent	BOULLET	\N	\N	u	\N	\N	\N	\N	\N	null	\N	\N	null	\N	\N	null	\N	\N
111	g_caze	g_caze	cbsa.gc@laposte.net	cbsa.gc@laposte.net	t	j5nziecd3dkc88s84ok8oskk84sococ	lzCblgpLp8jTIpceCDuzv1hHvgco3ew3wu8BRtC+1d1QTO7sxVkEwHeBpc5+nF3su5O2vHmpdhTQE016nNG90g==	\N	f	f	\N	\N	\N	a:0:{}	f	\N	2015-06-24 15:32:57	2015-06-24 15:32:57	\N	Gregory	CAZE	\N	\N	u	\N	\N	\N	\N	\N	null	\N	\N	null	\N	\N	null	\N	\N
119	j_geslin	j_geslin	j.geslin@cbnbrest.com	j.geslin@cbnbrest.com	t	fyocjnv0068kskkcsokwcckccswow0c	LmJ3xdsebWyciaMw372pxHnb4JJnieP3c3q4pYtjMUHTQBInyJGvRabbSa037SoSxpYLLUWZ24Zq6M9VDV9IIw==	\N	f	f	\N	\N	\N	a:0:{}	f	\N	2015-06-24 15:32:59	2015-06-24 15:32:59	\N	Julien	GESLIN	\N	\N	u	\N	\N	\N	\N	\N	null	\N	\N	null	\N	\N	null	\N	\N
120	j_gourvil	j_gourvil	johan.gourvil@fcbn.fr	johan.gourvil@fcbn.fr	t	tnoidc6netcwoosgcsogck0s4g880os	Wl/IVYLCEp5+wkFhi+CQTscUUER+TRM0x9xvBvx0YtsMmIplxI0sXcADpeP55VqSE32hwrBQfAvl/Au6cNmbzA==	\N	f	f	\N	\N	\N	a:0:{}	f	\N	2015-06-24 15:32:59	2015-06-24 15:32:59	\N	Johan	GOURVIL	\N	\N	u	\N	\N	\N	\N	\N	null	\N	\N	null	\N	\N	null	\N	\N
121	d_guyader	d_guyader	d.guyader@cbnbrest.com	d.guyader@cbnbrest.com	t	g13jbm7wv8gkk8cc84oo4cko04gwcow	B8MDSq1EKh6cxpAi6fKi0zRpgVuZ39SpxaD8tD/yFerjmHBvgXCiJsVDnIUr9Ienv9LeWYaXCZiR/sdfhNOybA==	\N	f	f	\N	\N	\N	a:0:{}	f	\N	2015-06-24 15:32:59	2015-06-24 15:32:59	\N	Dominique	GUYADER	\N	\N	u	\N	\N	\N	\N	\N	null	\N	\N	null	\N	\N	null	\N	\N
122	j_guyonneau	j_guyonneau	julien.guyonneau@cbnfc.org	julien.guyonneau@cbnfc.org	t	tlsd4g7rbk0448c40s4gogocwowkk8	MFsuDj6qTHrNzGjmRoKNknDCdM6iwCBxkfXAVEVj4R/+rJA0+GgQQoNbILxFzNpWkQ3LF3uRtAWTLnYJQ6BDtA==	\N	f	f	\N	\N	\N	a:0:{}	f	\N	2015-06-24 15:32:59	2015-06-24 15:32:59	\N	Julien	GUYONNEAU	\N	\N	u	\N	\N	\N	\N	\N	null	\N	\N	null	\N	\N	null	\N	\N
123	e_hamdi	e_hamdi	elodie.hamdi@cbnpmp.fr	elodie.hamdi@cbnpmp.fr	t	bvo4c26tpa0w8kw88gcso0g8oogg88g	DEiiFR3MuTrdNL2DpeIW9SMo1M7xq5ITs63SeeFwRhv6WTCoirLSY75EUuNutaZpaWprw3qqi81dAVGux0gaHQ==	\N	f	f	\N	\N	\N	a:0:{}	f	\N	2015-06-24 15:32:59	2015-06-24 15:32:59	\N	Elodie	HAMDI	\N	\N	u	\N	\N	\N	\N	\N	null	\N	\N	null	\N	\N	null	\N	\N
124	r_huet	r_huet	conservatoirebotanique.alsace@gmail.com	conservatoirebotanique.alsace@gmail.com	t	icu1kh3sfqgosoowo0swgwwogkc80os	AQrNqWX8Zw4z5NLhEXN+/LTcL4x9Lw8RQULKOgz/pndFm+He5JGPL8KYJeBpx9EykpTJNfLL8m+6jvhWzGiLWQ==	\N	f	f	\N	\N	\N	a:0:{}	f	\N	2015-06-24 15:33:00	2015-06-24 15:33:00	\N	Régis	HUET	\N	\N	u	\N	\N	\N	\N	\N	null	\N	\N	null	\N	\N	null	\N	\N
125	jb_lehebelperon	jb_lehebelperon	cbsa.jbl@laposte.net	cbsa.jbl@laposte.net	t	7n7ay4n0nw0swg0wcsggcsk8g4kgsw4	5oq6UupS4Zk+dHFIGYUBlwjZZ+fQGUkxjeUS9uWacltRqt/lyPY6kFpwsKHsXrhTvS0qlFN/SB0uX1BfoLlQtQ==	\N	f	f	\N	\N	\N	a:0:{}	f	\N	2015-06-24 15:33:00	2015-06-24 15:33:00	\N	Jean-Brieuc	LEHEBEL PERON	\N	\N	u	\N	\N	\N	\N	\N	null	\N	\N	null	\N	\N	null	\N	\N
106	t_milon	t_milon	thomas.milon@fcbn.fr	thomas.milon@fcbn.fr	t	87eo8o25twwsk00s808o8c88wc4o8og	nISzvwuXfzNqEaLr4xzhSL9bWPay0NNjkbSmsykWEyl5AXW/tCqBKSbofFgbDKTsqhd9xwMjjhXYIiCtXyflfg==	2015-06-24 12:21:10	f	f	\N	\N	\N	a:0:{}	f	\N	2015-06-24 12:20:29	2015-06-24 12:21:10	\N	Thomas	MILON	\N	\N	m	\N	\N	\N	\N	\N	null	\N	\N	null	\N	\N	null	\N	\N
127	a_plu	a_plu	anne.plu@mnhn.fr	anne.plu@mnhn.fr	t	cc767b71pjc4ok04w08ckocs8k8c0g8	By6KGqsSDV35Zq0L/35PgXvjdPlV/mMXlVqk3+ojcBhBkpP11WWZCNG/AYXO4P/I5L2dJXu8MeUYN08r4r0zJw==	\N	f	f	\N	\N	\N	a:0:{}	f	\N	2015-06-24 15:33:00	2015-06-24 15:33:00	\N	Anne	PLU	\N	\N	u	\N	\N	\N	\N	\N	null	\N	\N	null	\N	\N	null	\N	\N
128	p_spinosi	p_spinosi	spinosi@oec.fr	spinosi@oec.fr	t	jrj34ewdrtc8oos0s8c0400ccokc888	RfUMSKY0QUZLZdBnTSM9lyWxP7z6VdD8SZQ2anifUSz1kWybCrAjxuVRh6SUfnArMv8U21OpEIe+TIGI1lh1BQ==	\N	f	f	\N	\N	\N	a:0:{}	f	\N	2015-06-24 15:33:00	2015-06-24 15:33:00	\N	Paula	SPINOSI	\N	\N	u	\N	\N	\N	\N	\N	null	\N	\N	null	\N	\N	null	\N	\N
129	t_vergne	t_vergne	thierry.vergne@cbnmc.fr	thierry.vergne@cbnmc.fr	t	4eqrg7f0wtusgwk00g8o00ok40o8kok	zcJSxWZF2KNQJSxWAbkcfIXcrHKGhU+kQrNZ2lyrtncMmXzqJYDon84E9BsrBGs4TtNyEX+AL0CBVpWJ8kkcAw==	\N	f	f	\N	\N	\N	a:0:{}	f	\N	2015-06-24 15:33:00	2015-06-24 15:33:00	\N	Thierry	VERGNE	\N	\N	u	\N	\N	\N	\N	\N	null	\N	\N	null	\N	\N	null	\N	\N
130	y_ferrez	y_ferrez	yorick.ferrez@cbnfc.org	yorick.ferrez@cbnfc.org	t	rqs3zazujhw8cok0ogsc4kwggwsocsw	GLRW33h+jaNLsT0gO8UvyT+4on3USE69/ufgH6hMjapNiHP2B6xlqZWNencI0aNzeXY88yyOQbRGLdvQGAb5FQ==	\N	f	f	\N	\N	\N	a:0:{}	f	\N	2015-06-24 15:33:01	2015-06-24 15:33:01	\N	Yorrick	FERREZ	\N	\N	u	\N	\N	\N	\N	\N	null	\N	\N	null	\N	\N	null	\N	\N
131	s_magnanon	s_magnanon	s.magnanon@cbnbrest.com	s.magnanon@cbnbrest.com	t	nw6vpvxm6as44o08o0csos4cs8k4ooc	29rc9azCRQmMD2dFO5ad64nRWbprt04ytGTIhTpGo2HzszuPh1akoEZGOGPkMRF7gn+Rl5pW+4c3cL/8BMuviQ==	\N	f	f	\N	\N	\N	a:0:{}	f	\N	2015-06-24 15:33:01	2015-06-24 15:33:01	\N	Sylvie	MAGNANON	\N	\N	u	\N	\N	\N	\N	\N	null	\N	\N	null	\N	\N	null	\N	\N
132	j_molina	j_molina	j.molina@cbnmed.fr	j.molina@cbnmed.fr	t	3kzbejozjpa84sgw4gwg8ogg8sgwsoo	FjrMvtZML0sYgIdSQ2qKZF6XT5YtGQup5PO5/vaUfPnlA3O+nqNetrp+Mxc5QkLsFwAdxpQmO0cagvIyDG4kPw==	\N	f	f	\N	\N	\N	a:0:{}	f	\N	2015-06-24 15:33:01	2015-06-24 15:33:01	\N	James	MOLINA	\N	\N	u	\N	\N	\N	\N	\N	null	\N	\N	null	\N	\N	null	\N	\N
133	v_noble	v_noble	v.noble@cbnmed.fr	v.noble@cbnmed.fr	t	ib45v71p0zcw0ss4wo8gocg0o48wss8	ZYxKygzCZLKckSvN8MchLHi+2AQj3Ndws2ivBtUz0vRY+VYM+iUYr+IF4b7b1Trud1vtCwhnGpBv6+4SiGdYhQ==	\N	f	f	\N	\N	\N	a:0:{}	f	\N	2015-06-24 15:33:01	2015-06-24 15:33:01	\N	Virgile	NOBLE	\N	\N	u	\N	\N	\N	\N	\N	null	\N	\N	null	\N	\N	null	\N	\N
134	g_pache	g_pache	g.pache@cbn-alpin.fr	g.pache@cbn-alpin.fr	t	jpdmrowekv4gkog8gsgosos08k0040o	2GMhWMQmmDbSKxPEHqaIQC52dTuXgVYS2lFa6eqJbRySOrDmU4N2iiLRAMFd0qTE1P5JnC1D044UOpoiPveR6w==	\N	f	f	\N	\N	\N	a:0:{}	f	\N	2015-06-24 15:33:01	2015-06-24 15:33:01	\N	Gilles	PACHE	\N	\N	u	\N	\N	\N	\N	\N	null	\N	\N	null	\N	\N	null	\N	\N
135	f_picot	f_picot	fpicot@cbnm.org	fpicot@cbnm.org	t	jwh9d1iysuo88ww0sgg0cc80c8k8880	vC+gLwkWM/OZhJrlIZGo3MUb4JO14qlJYlNseaYX8v6mru+SjVPckJrIMjHrs0O4gc8Yxd/ISe3GkgQa7zveBw==	\N	f	f	\N	\N	\N	a:0:{}	f	\N	2015-06-24 15:33:02	2015-06-24 15:33:02	\N	Frédéric	PICOT	\N	\N	u	\N	\N	\N	\N	\N	null	\N	\N	null	\N	\N	null	\N	\N
136	m_isenmann	m_isenmann	m.isenmann.cbna@gmail.com	m.isenmann.cbna@gmail.com	t	aope85tqjs8os8o4k0wokgg0cok4sc4	Yd8NRiszc9s2rdFTesUMMGG4wLbEbd5WrN65tqKYm/qYPyhnTt1+nnpz2T2du5Lh77Qq6Fy10MbSdA7m0ZoPXQ==	\N	f	f	\N	\N	\N	a:0:{}	f	\N	2015-06-24 15:33:02	2015-06-24 15:33:02	\N	Marc	ISENMANN	\N	\N	u	\N	\N	\N	\N	\N	null	\N	\N	null	\N	\N	null	\N	\N
137	b_toussaint	b_toussaint	b.toussaint@cbnbl.org	b.toussaint@cbnbl.org	t	ro204g4f4yokkc8o44koo00o08csgok	/Ie1yLXGhKSCk/3wus1wZlNeJbbe8v2ECZL4v7ryqDUBPAmyqWjvmY+yDP69FonEhYJ1dVp9Gn37pilPPELAaw==	\N	f	f	\N	\N	\N	a:0:{}	f	\N	2015-06-24 15:33:02	2015-06-24 15:33:02	\N	Benoît	TOUSSAINT	\N	\N	u	\N	\N	\N	\N	\N	null	\N	\N	null	\N	\N	null	\N	\N
138	j_vangendt	j_vangendt	j.vangendt.cba@gmail.com	j.vangendt.cba@gmail.com	t	f1twxnsj6rk080cckok0gcs84w8kkw8	6rqwcb1oPSt+Evaslh2dyQ88TK49aVLe6pkKt8s5cHhYWc9JOArQyX6aHb2q7xyTcaSkHzVuE/ePlvih0JMh0A==	\N	f	f	\N	\N	\N	a:0:{}	f	\N	2015-06-24 15:33:02	2015-06-24 15:33:02	\N	Julie	VANGENDT	\N	\N	u	\N	\N	\N	\N	\N	null	\N	\N	null	\N	\N	null	\N	\N
139	jc_villaret	jc_villaret	jc.villaret@cbn-alpin.fr	jc.villaret@cbn-alpin.fr	t	tq9nxcw3z5cokok84wk4gc0gg40cwgw	Qa6bvlyiWvg9AdNw7h2At87kUBi6Bysoq01kq58AIyEiqFUIhS6Lg4tUrlJKkGyVjLbfv0IGcf0EBvO1SZ4AKA==	\N	f	f	\N	\N	\N	a:0:{}	f	\N	2015-06-24 15:33:02	2015-06-24 15:33:02	\N	Jean-Charles	VILLARET	\N	\N	u	\N	\N	\N	\N	\N	null	\N	\N	null	\N	\N	null	\N	\N
140	g_largier	g_largier	gerard.largier@cbnpmp.fr	gerard.largier@cbnpmp.fr	t	hzj18akwd3ww0w44kskokw8sosww4cc	bQSJvvYl0Ts+e6HdkQ2rMD+Cl2bDqFJHpaTvy3e0A3tZhjb6UAS9Ww80fZxtQeyaLjxMsjMMBc4uBEd/8xFfsw==	\N	f	f	\N	\N	\N	a:0:{}	f	\N	2015-06-24 15:33:02	2015-06-24 15:33:02	\N	Gérard	LARGIER	\N	\N	u	\N	\N	\N	\N	\N	null	\N	\N	null	\N	\N	null	\N	\N
141	b_dutreve	b_dutreve	bruno.dutreve@fcbn.fr	bruno.dutreve@fcbn.fr	t	n63utaun2rkwco4cgcs8ccsoos40cw4	yvRmx5I0ZnKnyONN4RfPUPX4uETjaLuSo/PbBtvmBEhvat0LSzOAmLLbhBu0kdDnKiOdUvFgOVdWsOXpRMQORA==	\N	f	f	\N	\N	\N	a:0:{}	f	\N	2015-06-24 15:33:03	2015-06-24 15:33:03	\N	Bruno	DUTREVE	\N	\N	u	\N	\N	\N	\N	\N	null	\N	\N	null	\N	\N	null	\N	\N
142	b_lienard	b_lienard	b.lienard@cbn-alpin.fr	b.lienard@cbn-alpin.fr	t	6jlwsxp9vnoko4c4wcowo040g8sgckw	NOXAo2GB+SRjrAF6XOw1PYG9c2oWJUQ8w1HZZs9DGf4BdSrI0kj3pqkAg2swOjFTmeQt6JJlxAERj6j9u5EmDw==	\N	f	f	\N	\N	\N	a:0:{}	f	\N	2015-06-24 15:33:03	2015-06-24 15:33:03	\N	Bertrand	LIENARD	\N	\N	u	\N	\N	\N	\N	\N	null	\N	\N	null	\N	\N	null	\N	\N
143	f_dehondt	f_dehondt	francois.dehondt@cbnfc.org	francois.dehondt@cbnfc.org	t	bx25vby3vjwcsg8ggok0skco8w0wc8k	IoxsoJ3dviLM+hJfUFDJDpNgSliZEy23+IUGEznWWzaHMMPMhPHCiJ3ocSAyiBS4E+uSG9JnbGXUuUfF4hI4Cw==	\N	f	f	\N	\N	\N	a:0:{}	f	\N	2015-06-24 15:33:03	2015-06-24 15:33:03	\N	François	DEHONDT	\N	\N	u	\N	\N	\N	\N	\N	null	\N	\N	null	\N	\N	null	\N	\N
144	f_hendoux	f_hendoux	hendoux@mnhn.fr	hendoux@mnhn.fr	t	7foswfxsdbk88s4sww4gg0008kgw00o	cYQMZ0kgc1hSt5shYQ916YCSrzcGy5Bcp6tqZB5i9yvbAzh4/3Ahm36uysup03HerOqMguKMKgEuRhKm9VsI3g==	\N	f	f	\N	\N	\N	a:0:{}	f	\N	2015-06-24 15:33:03	2015-06-24 15:33:03	\N	Frédéric	HENDOUX	\N	\N	u	\N	\N	\N	\N	\N	null	\N	\N	null	\N	\N	null	\N	\N
145	d_dherve	d_dherve	d.dherve@cbnbrest.com	d.dherve@cbnbrest.com	t	gtcrira6y28swk0kcs8w4sggk88gc88	pVi10Ad3/nIZ5KlmnK1E8pgajuVQFrGDJOjiNvxmQegzriOuh6+0pgAC6rUf4PFVsAM+PqA9/oEO8CZ7uMes4w==	\N	f	f	\N	\N	\N	a:0:{}	f	\N	2015-06-24 15:33:03	2015-06-24 15:33:03	\N	Dominique	DHERVE	\N	\N	u	\N	\N	\N	\N	\N	null	\N	\N	null	\N	\N	null	\N	\N
146	c_pradel	c_pradel	cbsa.cp@laposte.net	cbsa.cp@laposte.net	t	f2hy8sygmt4wc0sskkkgk4swgkok04o	GrMex3Mlbe0f3QfXgn+zabWcU0eCRl6bZA3T8VyyMV3yJ5a42o3KXmP1LNW5J3iaAcz+qPiv5mja/zjmzj7FnQ==	\N	f	f	\N	\N	\N	a:0:{}	f	\N	2015-06-24 15:33:04	2015-06-24 15:33:04	\N	Coralie	PRADEL	\N	\N	u	\N	\N	\N	\N	\N	null	\N	\N	null	\N	\N	null	\N	\N
147	jm_valet	jm_valet	jm.valet@cbnbl.org	jm.valet@cbnbl.org	t	tnn1kdyaw2okgg080o80oso0404o0cs	hGz/PgnysQ0RXrrKydwmAQjC+fLNvbGzqLa2pTbMGOs1X9nqpJxe0wEo4N8GI0Ply1kISkmCnvxwyJTmzFcruA==	\N	f	f	\N	\N	\N	a:0:{}	f	\N	2015-06-24 15:33:04	2015-06-24 15:33:04	\N	Jean-Marc	VALET	\N	\N	u	\N	\N	\N	\N	\N	null	\N	\N	null	\N	\N	null	\N	\N
112	g_corriol	g_corriol	gilles.corriol@cbnpmp.fr	gilles.corriol@cbnpmp.fr	t	c2m8ib6n6cgkso8c88ckc8kco4g8cks	1e+Rxs5XhnmdBRYpAqwdgfYwQd0YW0IElVb2qQRXYrLf8kz3ovnhKwE7rWb+Lo3znpgq4pdDCk2YBt1g+WtTUw==	\N	f	f	\N	\N	\N	a:0:{}	f	\N	2015-06-24 15:32:57	2015-06-24 15:32:57	\N	Gilles	CORRIOL	\N	\N	u	\N	\N	\N	\N	\N	null	\N	\N	null	\N	\N	null	\N	\N
113	a_delage	a_delage	Alain.Delage@oec.fr	alain.delage@oec.fr	t	b7it98o9i60w08w448kskwkgg000w0c	7oCANf1wpqt8V8WeCuZEelQf2FZ/brN7DVIpxuhzbqVUukuMwV7IzFk/qzslzdSFT+tSQJAZsnuyq31je3dLOg==	\N	f	f	\N	\N	\N	a:0:{}	f	\N	2015-06-24 15:32:58	2015-06-24 15:32:58	\N	Alain	DELAGE	\N	\N	u	\N	\N	\N	\N	\N	null	\N	\N	null	\N	\N	null	\N	\N
114	a_desse	a_desse	a.desse@cbnbl.org	a.desse@cbnbl.org	t	hm9ppfg9vv48g0kkk8w0wkk8cwwso08	rtWtq0ekXud+8nWrc7MLLk/SpH9kacsK4KERPgQgC9swN8exATRqI4KU+H6O6GBnGSp8vLsVfTGqjDoQ+nyZsA==	\N	f	f	\N	\N	\N	a:0:{}	f	\N	2015-06-24 15:32:58	2015-06-24 15:32:58	\N	Alexis	DESSE	\N	\N	u	\N	\N	\N	\N	\N	null	\N	\N	null	\N	\N	null	\N	\N
115	s_filoche	s_filoche	filoche@mnhn.fr	filoche@mnhn.fr	t	sqfwcb1qb1wcgs8k444g4ow4o0kkso0	FR+qbLxnezL6BiAit8IpYyn0EF4ahm5zpQJPwhSXiVm5lQEqzqScJmIPsw+0WiIoQ3droYeOF2Gr93l934nFFg==	\N	f	f	\N	\N	\N	a:0:{}	f	\N	2015-06-24 15:32:58	2015-06-24 15:32:58	\N	Sébastien	FILOCHE	\N	\N	u	\N	\N	\N	\N	\N	null	\N	\N	null	\N	\N	null	\N	\N
116	l_garraud	l_garraud	l.garraud@cbn-alpin.fr	l.garraud@cbn-alpin.fr	t	flmbtvhyqnks0gckcwc00osk8w8s0gg	aElXshi6Y7UQ9afjO8C3sdEGebdz8BGPhK6CmnCMfAxOv7mh4QmdXvV+/NO2+DtvIaFYiM/3H3WTvw0ZJv0jOw==	\N	f	f	\N	\N	\N	a:0:{}	f	\N	2015-06-24 15:32:58	2015-06-24 15:32:58	\N	Luc	GARRAUD	\N	\N	u	\N	\N	\N	\N	\N	null	\N	\N	null	\N	\N	null	\N	\N
117	o_gavotto	o_gavotto	o.gavotto@cbnmed.fr	o.gavotto@cbnmed.fr	t	q6kbz9mccussc8o84cckssskgkcwo4s	0sVPdaxq3vAusPLS6eJO5am/HtruT08Jgub4nbKlDKYA8kUjVW9bGnqNTQ8XIQMq7R1TFlSdCsMGSey5vlEbMw==	\N	f	f	\N	\N	\N	a:0:{}	f	\N	2015-06-24 15:32:58	2015-06-24 15:32:58	\N	Olivier	GAVOTTO	\N	\N	u	\N	\N	\N	\N	\N	null	\N	\N	null	\N	\N	null	\N	\N
118	jm_genis	jm_genis	jm.genis@cbn-alpin.org	jm.genis@cbn-alpin.org	t	djitaroai5w8oc8g0okwcg8ocwo4gw8	Ga+pUoMeQhXExeqKgwiPJIx/zN3bu4Ahe2PzX23HFAsxbmkgSBkUR3wmGtAN6VcBouyBRL7fYSMq7KRbeQ/Frg==	\N	f	f	\N	\N	\N	a:0:{}	f	\N	2015-06-24 15:32:58	2015-06-24 15:32:58	\N	Jean-Michel	GENIS	\N	\N	u	\N	\N	\N	\N	\N	null	\N	\N	null	\N	\N	null	\N	\N
148	l_hugot	l_hugot	laetitia.hugot@oec.fr	laetitia.hugot@oec.fr	t	9cozdg7ivgw8cwwgw0wckgg0w048gw4	ROj0Dcpo8soSxbxY2Q4WP6TP9CToTqN0O4lB65hpCUasmQYh+fitJfmF9loGB+ueaoeRvJOwDsUWcGq9qSOG9A==	\N	f	f	\N	\N	\N	a:0:{}	f	\N	2015-06-24 15:33:04	2015-06-24 15:33:04	\N	Laetitia	HUGOT	\N	\N	u	\N	\N	\N	\N	\N	null	\N	\N	null	\N	\N	null	\N	\N
149	d_lucas	d_lucas	dlucas@cbnm.org	dlucas@cbnm.org	t	5od6c73w190c00c444wws848og4g48s	4Eleog7xMaJvdsw6VWqLkfIskQv/cqwEzi7WBu54g+/cLukDnZZudQeckej/2Vlr18VyJhd/Vtw968NxuDfqMA==	\N	f	f	\N	\N	\N	a:0:{}	f	\N	2015-06-24 15:33:04	2015-06-24 15:33:04	\N	Daniel	LUCAS	\N	\N	u	\N	\N	\N	\N	\N	null	\N	\N	null	\N	\N	null	\N	\N
150	s_lochonmenseau	s_lochonmenseau	s.lochon-menseau@cbnmed.fr	s.lochon-menseau@cbnmed.fr	t	qqc0qyd2jc0kocs4k8080gc88ws8ocs	uflcOGEodUKkK5o0gDVQrhdRucEh5lYDUNcdsuk6bfrifxxwSCYSX9UqezMXJVWwlUvzLZvQAMWtNTSUvs+Cnw==	\N	f	f	\N	\N	\N	a:0:{}	f	\N	2015-06-24 15:33:04	2015-06-24 15:33:04	\N	Sylvia	LOCHON MENSEAU	\N	\N	u	\N	\N	\N	\N	\N	null	\N	\N	null	\N	\N	null	\N	\N
151	i_mandon	i_mandon	isabelle.mandon@fcbn.fr	isabelle.mandon@fcbn.fr	t	9xv4yglhfz4g84gkssw4ss888s8swo4	br0B1pPr4MyrPSVf/W4huRbNCBqPq0A8yg8QOEVs5gU15aSrM6xdzEmvLJKvm0sJD9co06gGNgQqkASnOLqm8g==	\N	f	f	\N	\N	\N	a:0:{}	f	\N	2015-06-24 15:33:04	2015-06-24 15:33:04	\N	Isabelle	MANDON	\N	\N	u	\N	\N	\N	\N	\N	null	\N	\N	null	\N	\N	null	\N	\N
\.


--
-- Data for Name: fos_user_user_group; Type: TABLE DATA; Schema: public; Owner: siflore
--

COPY fos_user_user_group (user_id, group_id) FROM stdin;
\.


--
-- Name: fos_user_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: siflore
--

SELECT pg_catalog.setval('fos_user_user_id_seq', 152, true);


--
-- Data for Name: maplayers; Type: TABLE DATA; Schema: public; Owner: siflore
--

COPY maplayers (id, tree_node_child, label, variable_javascript, layers, type_webservice, zone, url, description) FROM stdin;
442	Fonds de cartes	Territoires agréments CBN	cbn_territoires_agrem	Territoires agréments CBN	WMS	metropole	http://94.23.218.10/cgi-bin/qgis_mapserv.fcgi?map=/home/fcbn/htdocs/fond_carto/fond_carto_si_flore.qgs	Limites des territoires d'agrément des CBN
443	Fonds de cartes	Régions biogéographiques	regions_bio	Régions biogéographiques	WMS	metropole	http://94.23.218.10/cgi-bin/qgis_mapserv.fcgi?map=/home/fcbn/htdocs/fond_carto/fond_carto_si_flore.qgs	Régions biogéographiques. Cette couche, initialement nommée "regions_biogeo_aee_france.shp" est issue d'une extraction pour la France (avec les limites BdCarto) et d'une reprojection en RGF93 - Lambert 93 par Maëlle DECHERF (FCBN) de la couche diffusée par l'Agence européenne de l'environnement à l'adresse suivante :;http://www.eea.europa.eu/data-and-maps/data/biogeographical-regions-europe-2008
444	Fonds de cartes	Agences de l'eau	agences_eau	Agences de l'eau	WMS	metropole	http://94.23.218.10/cgi-bin/qgis_mapserv.fcgi?map=/home/fcbn/htdocs/fond_carto/fond_carto_si_flore.qgs	Limites des agences de l'eau (générée à partir de la bd_carthage)
445	Fonds de cartes	Carte routière	scan_1000	scan_1000_v2	WMS	metropole	http://94.23.218.10/cgi-bin/qgis_mapserv.fcgi?map=/home/fcbn/htdocs/fond_carto/fond_carto_si_flore.qgs	Scan 1000 de la France métropolitaine (carte au 1/1000000)
446	Fonds de cartes	Relief	relief_metropole	Relief	WMS	metropole	http://94.23.218.10/cgi-bin/qgis_mapserv.fcgi?map=/home/fcbn/htdocs/fond_carto/fond_carto_si_flore.qgs	Illustration du relief de la France à partir d'un MNT 250 mètres avec comme échelle (pas de valeur/0-200m/200-500m/500-900m/900-1600m/1600-2100/2100-2800/>2800)
447	Fonds de cartes	Territoires agréments CBN	cbn_territoires_agrem_mas	Territoires agréments CBN (Réunion)	WMS	reunion	http://94.23.218.10/cgi-bin/qgis_mapserv.fcgi?map=/home/fcbn/htdocs/fond_carto/fond_carto_si_flore.qgs	Limites du territoire d'agrément CBN mascarin (uniquement ile de la réunion sans Mayotte et iles éparses)
448	Fonds de cartes	Scan 100	scan_100_mas	scan_100_mas	WMS	reunion	http://94.23.218.10/cgi-bin/qgis_mapserv.fcgi?map=/home/fcbn/htdocs/fond_carto/fond_carto_si_flore.qgs	Scan 100 de l'ile de la Réunion (carte au 1/100000)
449	Limites administratives et CBN	Territoires de compétence des CBN	limite_admin_cbn	Territoires agréments CBN contours	WMS	metropole	http://94.23.218.10/cgi-bin/qgis_mapserv.fcgi?map=/home/fcbn/htdocs/fond_carto/fond_carto_si_flore.qgs	Contours avec fond transparent des territoires d'agrément des CBN
450	Limites administratives et CBN	Départements	limite_admin_cbn	Départements	WMS	metropole	http://94.23.218.10/cgi-bin/qgis_mapserv.fcgi?map=/home/fcbn/htdocs/fond_carto/fond_carto_si_flore.qgs	
451	INPN	Terrains des Conservatoires des espaces naturels	inpn	Terrains_des_Conservatoires_des_espaces_naturels	WMS	metropole	http://ws.carmencarto.fr/WMS/119/fxx_inpn	Limite des terrains des conservatoires d'espaces naturels
452	INPN	Terrains du Conservatoire du Littoral	inpn	Terrains_du_Conservatoire_du_Littoral	WMS	metropole	http://ws.carmencarto.fr/WMS/119/fxx_inpn	Limites des terrains du conservatoire du littoral
453	INPN	Arretes de protection de biotope	inpn	Arretes_de_protection_de_biotope	WMS	metropole	http://ws.carmencarto.fr/WMS/119/fxx_inpn	Limites des arrêtés de protection du biotope
454	INPN	Reserves naturelles nationales	inpn	Reserves_naturelles_nationales	WMS	metropole	http://ws.carmencarto.fr/WMS/119/fxx_inpn	Limites des Réserves Naturelles Nationales.
455	INPN	Reserves naturelles regionales	inpn	Reserves_naturelles_regionales	WMS	metropole	http://ws.carmencarto.fr/WMS/119/fxx_inpn	Limites des Réserves Naturelles Régionales. Réserves créées à l'initiative des régions.
456	INPN	Réserves naturelles de la collectivité territoriale de Corse	inpn	rnc	WMS	metropole	http://ws.carmencarto.fr/WMS/119/fxx_inpn	Limites des Réserves Naturelles de la Collectivité territoriale de Corse
457	INPN	Reserves biologiques	inpn	Reserves_biologiques	WMS	metropole	http://ws.carmencarto.fr/WMS/119/fxx_inpn	Limites des réserves biologiques. Elles s'appliquent au domaine forestier de l'Etat (réserve biologique domaniale) géré par l'Office national des forêts (ONF)
458	INPN	Sites Ramsar	inpn	Sites_Ramsar	WMS	metropole	http://ws.carmencarto.fr/WMS/119/fxx_inpn	Limites des sites Ramsar. Ramsar est une convention visant à la protection des zones humides d'importance internationale.
459	INPN	Parcs nationaux	inpn	Parcs_nationaux	WMS	metropole	http://ws.carmencarto.fr/WMS/119/fxx_inpn	Limites des Parcs nationaux
460	INPN	Reserves nationales de chasse et faune sauvage	inpn	Reserves_nationales_de_chasse_et_faune_sauvage	WMS	metropole	http://ws.carmencarto.fr/WMS/119/fxx_inpn	Limites des réserves nationales de chasse et faune sauvage
461	INPN	Reserves de la biosphere	inpn	Reserves_de_la_biosphere	WMS	metropole	http://ws.carmencarto.fr/WMS/119/fxx_inpn	Limites des réserves des la biosphère
462	INPN	Parcs naturels regionaux	inpn	Parcs_naturels_regionaux	WMS	metropole	http://ws.carmencarto.fr/WMS/119/fxx_inpn	Limites des parcs naturels régionaux
463	INPN	Parc naturel marin	inpn	Parc_naturel_marin	WMS	metropole	http://ws.carmencarto.fr/WMS/119/fxx_inpn	Limites des parcs naturels marins
464	INPN	Znieff1	inpn	Znieff1	WMS	metropole	http://ws.carmencarto.fr/WMS/119/fxx_inpn	Limites des znieff de type1
465	INPN	Znieff2	inpn	Znieff2	WMS	metropole	http://ws.carmencarto.fr/WMS/119/fxx_inpn	Limites des znieff de type2
466	INPN	Sites d'importance communautaire	inpn	Sites_d_importance_communautaire	WMS	metropole	http://ws.carmencarto.fr/WMS/119/fxx_inpn	Limites des zones d'importance communautaire
467	INPN	Zones de protection spéciale	inpn	Zones_de_protection_speciale	WMS	metropole	http://ws.carmencarto.fr/WMS/119/fxx_inpn	Limites des zones de protection spéciales
468	Fonds de cartes	GeoSignal	raster_geosignal	RASTER25k	WMS	metropole	http://wms.geosignal.fr/metropole	Carte routière géosignal au 25000 eme (affichage en fonction du zoom)
469	Fonds de cartes	GeoSignal	raster_geosignal	RASTER50k	WMS	metropole	http://wms.geosignal.fr/metropole	Carte routière géosignal au 50000 eme (affichage en fonction du zoom)
470	Fonds de cartes	GeoSignal	raster_geosignal	RASTER100k	WMS	metropole	http://wms.geosignal.fr/metropole	Carte routière géosignal au 100000 eme (affichage en fonction du zoom)
471	Fonds de cartes	GeoSignal	raster_geosignal	RASTER250k	WMS	metropole	http://wms.geosignal.fr/metropole	Carte routière géosignal au 250000 eme (affichage en fonction du zoom)
472	Fonds de cartes	GeoSignal	raster_geosignal	RASTER500k	WMS	metropole	http://wms.geosignal.fr/metropole	Carte routière géosignal au 500000 eme (affichage en fonction du zoom)
473	Fonds de cartes	GeoSignal	raster_geosignal	RASTER1000k	WMS	metropole	http://wms.geosignal.fr/metropole	Carte routière géosignal au 1000000 eme (affichage en fonction du zoom)
474	Fonds de cartes	GeoSignal	raster_geosignal	RASTER5k	WMS	metropole	http://wms.geosignal.fr/metropole	Carte routière géosignal au 5000 eme (affichage en fonction du zoom)
475	Fonds de cartes	GeoSignal	raster_geosignal	RASTER4000k	WMS	metropole	http://wms.geosignal.fr/metropole	Carte routière géosignal au 4000000 eme (affichage en fonction du zoom)
476	pas utilise	Corinne Land cover 2006	corinne_land_cover	topp:CLC06_RGF	WMS	metropole	http://sd1878-2.sivit.org/geoserver/wms	occupation du sol corine land cover (pas utilisée car longue à l'affichage, il faudrait pouvoir utiliser un niveau de zoom à laquelle elle apparait)
477	Cours d'eau	Cours d'eau de plus de 100km	cours_eau_sandre	CoursEau1	WMS	metropole	http://services.sandre.eaufrance.fr/geo/zonage	Cours d'eau de plus de 100km
478	Cours d'eau	Cours d'eau de 50 à 100km	cours_eau_sandre	CoursEau2	WMS	metropole	http://services.sandre.eaufrance.fr/geo/zonage	Cours d'eau de 50 à 100km
479	Cours d'eau	Cours d'eau de 25 à 50km	cours_eau_sandre	CoursEau3	WMS	metropole	http://services.sandre.eaufrance.fr/geo/zonage	Cours d'eau de 25 à 50km
480	INPN	Reserves biologiques	inpn_reunion_1	Reserves_biologiques	WMS	reunion	http://ws.carmencarto.fr/WMS/119/reu_inpn	Limites des réserves biologiques
481	INPN	Parcs nationaux	inpn_reunion_2	Parcs_nationaux	WMS	reunion	http://ws.carmencarto.fr/WMS/119/reu_inpn	Limites des parcs nationaux
482	INPN	Terrains du Conservatoire du Littoral	inpn_reunion_3	Terrains_du_Conservatoire_du_Littoral	WMS	reunion	http://ws.carmencarto.fr/WMS/119/reu_inpn	Limites des terrains du conservatoire du littoral
483	INPN	Arretes de protection de biotope	inpn_reunion_4	Arretes_de_protection_de_biotope	WMS	reunion	http://ws.carmencarto.fr/WMS/119/reu_inpn	Limites des arrêtés de protection du biotope
484	INPN	Reserves naturelles nationales	inpn_reunion_5	Reserves_naturelles_nationales	WMS	reunion	http://ws.carmencarto.fr/WMS/119/reu_inpn	Limites des réserves naturelles
\.


--
-- Name: maplayers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: siflore
--

SELECT pg_catalog.setval('maplayers_id_seq', 484, true);


--
-- PostgreSQL database dump complete
--

