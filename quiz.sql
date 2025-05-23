PGDMP      2                }           fyp-quiz    17.4    17.4 M    M           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            N           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            O           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            P           1262    24691    fyp-quiz    DATABASE     p   CREATE DATABASE "fyp-quiz" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en-US';
    DROP DATABASE "fyp-quiz";
                     postgres    false            �            1259    24747    answers    TABLE     >  CREATE TABLE public.answers (
    id bigint NOT NULL,
    question_id bigint NOT NULL,
    answer_text text NOT NULL,
    rate integer NOT NULL,
    best_answer boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone
);
    DROP TABLE public.answers;
       public         heap r       postgres    false            �            1259    24746    answers_id_seq    SEQUENCE     w   CREATE SEQUENCE public.answers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.answers_id_seq;
       public               postgres    false    228            Q           0    0    answers_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.answers_id_seq OWNED BY public.answers.id;
          public               postgres    false    227            �            1259    24715    articles    TABLE       CREATE TABLE public.articles (
    id bigint NOT NULL,
    category_id bigint NOT NULL,
    title character varying(255) NOT NULL,
    subtitle character varying(255) NOT NULL,
    authors character varying(255) NOT NULL,
    url character varying(255) NOT NULL,
    image character varying(255),
    image_extension character varying(255),
    published boolean NOT NULL,
    content text NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone
);
    DROP TABLE public.articles;
       public         heap r       postgres    false            �            1259    24714    articles_id_seq    SEQUENCE     x   CREATE SEQUENCE public.articles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.articles_id_seq;
       public               postgres    false    222            R           0    0    articles_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.articles_id_seq OWNED BY public.articles.id;
          public               postgres    false    221            �            1259    24775    attempt_questions    TABLE     D  CREATE TABLE public.attempt_questions (
    id bigint NOT NULL,
    attempt_id bigint NOT NULL,
    question_id bigint NOT NULL,
    selected_answer bigint NOT NULL,
    best_answer bigint NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone
);
 %   DROP TABLE public.attempt_questions;
       public         heap r       postgres    false            �            1259    24774    attempt_questions_id_seq    SEQUENCE     �   CREATE SEQUENCE public.attempt_questions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.attempt_questions_id_seq;
       public               postgres    false    232            S           0    0    attempt_questions_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.attempt_questions_id_seq OWNED BY public.attempt_questions.id;
          public               postgres    false    231            �            1259    24757    attempts    TABLE     �  CREATE TABLE public.attempts (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    quiz_id bigint NOT NULL,
    question_number integer NOT NULL,
    question_correct bigint,
    vulnerability_rate numeric(5,2),
    completed boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone
);
    DROP TABLE public.attempts;
       public         heap r       postgres    false            �            1259    24756    attempts_id_seq    SEQUENCE     x   CREATE SEQUENCE public.attempts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.attempts_id_seq;
       public               postgres    false    230            T           0    0    attempts_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.attempts_id_seq OWNED BY public.attempts.id;
          public               postgres    false    229            �            1259    24706 
   categories    TABLE       CREATE TABLE public.categories (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    description character varying(255) NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone
);
    DROP TABLE public.categories;
       public         heap r       postgres    false            �            1259    24705    categories_id_seq    SEQUENCE     z   CREATE SEQUENCE public.categories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.categories_id_seq;
       public               postgres    false    220            U           0    0    categories_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;
          public               postgres    false    219            �            1259    24738 	   questions    TABLE     �   CREATE TABLE public.questions (
    id bigint NOT NULL,
    question_text text NOT NULL,
    feedback text NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone
);
    DROP TABLE public.questions;
       public         heap r       postgres    false            �            1259    24737    questions_id_seq    SEQUENCE     y   CREATE SEQUENCE public.questions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.questions_id_seq;
       public               postgres    false    226            V           0    0    questions_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.questions_id_seq OWNED BY public.questions.id;
          public               postgres    false    225            �            1259    24817    quiz_feedbacks    TABLE     "  CREATE TABLE public.quiz_feedbacks (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    quiz_id bigint NOT NULL,
    feedback character varying(255) NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone
);
 "   DROP TABLE public.quiz_feedbacks;
       public         heap r       postgres    false            �            1259    24816    quiz_feedbacks_id_seq    SEQUENCE     ~   CREATE SEQUENCE public.quiz_feedbacks_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.quiz_feedbacks_id_seq;
       public               postgres    false    234            W           0    0    quiz_feedbacks_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.quiz_feedbacks_id_seq OWNED BY public.quiz_feedbacks.id;
          public               postgres    false    233            �            1259    24729    quizzes    TABLE       CREATE TABLE public.quizzes (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    description character varying(255) NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone
);
    DROP TABLE public.quizzes;
       public         heap r       postgres    false            �            1259    24728    quizzes_id_seq    SEQUENCE     w   CREATE SEQUENCE public.quizzes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.quizzes_id_seq;
       public               postgres    false    224            X           0    0    quizzes_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.quizzes_id_seq OWNED BY public.quizzes.id;
          public               postgres    false    223            �            1259    24693    users    TABLE     �  CREATE TABLE public.users (
    id bigint NOT NULL,
    role integer DEFAULT 2 NOT NULL,
    username character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    firstname character varying(255) NOT NULL,
    lastname character varying(255),
    dob character varying(255),
    active boolean DEFAULT true NOT NULL,
    last_attempt timestamp with time zone,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone
);
    DROP TABLE public.users;
       public         heap r       postgres    false            �            1259    24692    users_id_seq    SEQUENCE     u   CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public               postgres    false    218            Y           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public               postgres    false    217            �           2604    24750 
   answers id    DEFAULT     h   ALTER TABLE ONLY public.answers ALTER COLUMN id SET DEFAULT nextval('public.answers_id_seq'::regclass);
 9   ALTER TABLE public.answers ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    227    228    228            �           2604    24718    articles id    DEFAULT     j   ALTER TABLE ONLY public.articles ALTER COLUMN id SET DEFAULT nextval('public.articles_id_seq'::regclass);
 :   ALTER TABLE public.articles ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    221    222    222            �           2604    24778    attempt_questions id    DEFAULT     |   ALTER TABLE ONLY public.attempt_questions ALTER COLUMN id SET DEFAULT nextval('public.attempt_questions_id_seq'::regclass);
 C   ALTER TABLE public.attempt_questions ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    231    232    232            �           2604    24760    attempts id    DEFAULT     j   ALTER TABLE ONLY public.attempts ALTER COLUMN id SET DEFAULT nextval('public.attempts_id_seq'::regclass);
 :   ALTER TABLE public.attempts ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    230    229    230            �           2604    24709    categories id    DEFAULT     n   ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);
 <   ALTER TABLE public.categories ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    220    219    220            �           2604    24741    questions id    DEFAULT     l   ALTER TABLE ONLY public.questions ALTER COLUMN id SET DEFAULT nextval('public.questions_id_seq'::regclass);
 ;   ALTER TABLE public.questions ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    225    226    226            �           2604    24820    quiz_feedbacks id    DEFAULT     v   ALTER TABLE ONLY public.quiz_feedbacks ALTER COLUMN id SET DEFAULT nextval('public.quiz_feedbacks_id_seq'::regclass);
 @   ALTER TABLE public.quiz_feedbacks ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    233    234    234            �           2604    24732 
   quizzes id    DEFAULT     h   ALTER TABLE ONLY public.quizzes ALTER COLUMN id SET DEFAULT nextval('public.quizzes_id_seq'::regclass);
 9   ALTER TABLE public.quizzes ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    223    224    224                       2604    24696    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    217    218    218            D          0    24747    answers 
   TABLE DATA           v   COPY public.answers (id, question_id, answer_text, rate, best_answer, created_at, updated_at, deleted_at) FROM stdin;
    public               postgres    false    228   �b       >          0    24715    articles 
   TABLE DATA           �   COPY public.articles (id, category_id, title, subtitle, authors, url, image, image_extension, published, content, created_at, updated_at, deleted_at) FROM stdin;
    public               postgres    false    222   �l       H          0    24775    attempt_questions 
   TABLE DATA           �   COPY public.attempt_questions (id, attempt_id, question_id, selected_answer, best_answer, created_at, updated_at, deleted_at) FROM stdin;
    public               postgres    false    232   w       F          0    24757    attempts 
   TABLE DATA           �   COPY public.attempts (id, user_id, quiz_id, question_number, question_correct, vulnerability_rate, completed, created_at, updated_at, deleted_at) FROM stdin;
    public               postgres    false    230   {{       <          0    24706 
   categories 
   TABLE DATA           _   COPY public.categories (id, name, description, created_at, updated_at, deleted_at) FROM stdin;
    public               postgres    false    220   �|       B          0    24738 	   questions 
   TABLE DATA           d   COPY public.questions (id, question_text, feedback, created_at, updated_at, deleted_at) FROM stdin;
    public               postgres    false    226   �}       J          0    24817    quiz_feedbacks 
   TABLE DATA           l   COPY public.quiz_feedbacks (id, user_id, quiz_id, feedback, created_at, updated_at, deleted_at) FROM stdin;
    public               postgres    false    234   .�       @          0    24729    quizzes 
   TABLE DATA           \   COPY public.quizzes (id, name, description, created_at, updated_at, deleted_at) FROM stdin;
    public               postgres    false    224   ��       :          0    24693    users 
   TABLE DATA           �   COPY public.users (id, role, username, password, firstname, lastname, dob, active, last_attempt, created_at, updated_at, deleted_at) FROM stdin;
    public               postgres    false    218   ��       Z           0    0    answers_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.answers_id_seq', 64, true);
          public               postgres    false    227            [           0    0    articles_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.articles_id_seq', 4, true);
          public               postgres    false    221            \           0    0    attempt_questions_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.attempt_questions_id_seq', 100, true);
          public               postgres    false    231            ]           0    0    attempts_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.attempts_id_seq', 19, true);
          public               postgres    false    229            ^           0    0    categories_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.categories_id_seq', 7, true);
          public               postgres    false    219            _           0    0    questions_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.questions_id_seq', 16, true);
          public               postgres    false    225            `           0    0    quiz_feedbacks_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.quiz_feedbacks_id_seq', 2, true);
          public               postgres    false    233            a           0    0    quizzes_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.quizzes_id_seq', 1, true);
          public               postgres    false    223            b           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 15, true);
          public               postgres    false    217            �           2606    24755    answers answers_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.answers
    ADD CONSTRAINT answers_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.answers DROP CONSTRAINT answers_pkey;
       public                 postgres    false    228            �           2606    24722    articles articles_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.articles
    ADD CONSTRAINT articles_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.articles DROP CONSTRAINT articles_pkey;
       public                 postgres    false    222            �           2606    24780 (   attempt_questions attempt_questions_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.attempt_questions
    ADD CONSTRAINT attempt_questions_pkey PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.attempt_questions DROP CONSTRAINT attempt_questions_pkey;
       public                 postgres    false    232            �           2606    24763    attempts attempts_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.attempts
    ADD CONSTRAINT attempts_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.attempts DROP CONSTRAINT attempts_pkey;
       public                 postgres    false    230            �           2606    24713    categories categories_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.categories DROP CONSTRAINT categories_pkey;
       public                 postgres    false    220            �           2606    24745    questions questions_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.questions DROP CONSTRAINT questions_pkey;
       public                 postgres    false    226            �           2606    24822 "   quiz_feedbacks quiz_feedbacks_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.quiz_feedbacks
    ADD CONSTRAINT quiz_feedbacks_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.quiz_feedbacks DROP CONSTRAINT quiz_feedbacks_pkey;
       public                 postgres    false    234            �           2606    24736    quizzes quizzes_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.quizzes
    ADD CONSTRAINT quizzes_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.quizzes DROP CONSTRAINT quizzes_pkey;
       public                 postgres    false    224            �           2606    24702    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public                 postgres    false    218            �           2606    24801     answers answers_question_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.answers
    ADD CONSTRAINT answers_question_id_fkey FOREIGN KEY (question_id) REFERENCES public.questions(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;
 J   ALTER TABLE ONLY public.answers DROP CONSTRAINT answers_question_id_fkey;
       public               postgres    false    228    4757    226            �           2606    24723 "   articles articles_category_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.articles
    ADD CONSTRAINT articles_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id) ON UPDATE CASCADE ON DELETE CASCADE;
 L   ALTER TABLE ONLY public.articles DROP CONSTRAINT articles_category_id_fkey;
       public               postgres    false    222    220    4751            �           2606    24781 3   attempt_questions attempt_questions_attempt_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.attempt_questions
    ADD CONSTRAINT attempt_questions_attempt_id_fkey FOREIGN KEY (attempt_id) REFERENCES public.attempts(id) ON UPDATE CASCADE ON DELETE CASCADE;
 ]   ALTER TABLE ONLY public.attempt_questions DROP CONSTRAINT attempt_questions_attempt_id_fkey;
       public               postgres    false    4761    232    230            �           2606    24796 4   attempt_questions attempt_questions_best_answer_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.attempt_questions
    ADD CONSTRAINT attempt_questions_best_answer_fkey FOREIGN KEY (best_answer) REFERENCES public.answers(id) ON UPDATE CASCADE ON DELETE CASCADE;
 ^   ALTER TABLE ONLY public.attempt_questions DROP CONSTRAINT attempt_questions_best_answer_fkey;
       public               postgres    false    228    232    4759            �           2606    24786 4   attempt_questions attempt_questions_question_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.attempt_questions
    ADD CONSTRAINT attempt_questions_question_id_fkey FOREIGN KEY (question_id) REFERENCES public.questions(id) ON UPDATE CASCADE ON DELETE CASCADE;
 ^   ALTER TABLE ONLY public.attempt_questions DROP CONSTRAINT attempt_questions_question_id_fkey;
       public               postgres    false    232    226    4757            �           2606    24791 8   attempt_questions attempt_questions_selected_answer_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.attempt_questions
    ADD CONSTRAINT attempt_questions_selected_answer_fkey FOREIGN KEY (selected_answer) REFERENCES public.answers(id) ON UPDATE CASCADE ON DELETE CASCADE;
 b   ALTER TABLE ONLY public.attempt_questions DROP CONSTRAINT attempt_questions_selected_answer_fkey;
       public               postgres    false    228    232    4759            �           2606    24811    attempts attempts_quiz_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.attempts
    ADD CONSTRAINT attempts_quiz_id_fkey FOREIGN KEY (quiz_id) REFERENCES public.quizzes(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;
 H   ALTER TABLE ONLY public.attempts DROP CONSTRAINT attempts_quiz_id_fkey;
       public               postgres    false    4755    230    224            �           2606    24806    attempts attempts_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.attempts
    ADD CONSTRAINT attempts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;
 H   ALTER TABLE ONLY public.attempts DROP CONSTRAINT attempts_user_id_fkey;
       public               postgres    false    218    230    4749            �           2606    24828 *   quiz_feedbacks quiz_feedbacks_quiz_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.quiz_feedbacks
    ADD CONSTRAINT quiz_feedbacks_quiz_id_fkey FOREIGN KEY (quiz_id) REFERENCES public.quizzes(id);
 T   ALTER TABLE ONLY public.quiz_feedbacks DROP CONSTRAINT quiz_feedbacks_quiz_id_fkey;
       public               postgres    false    234    224    4755            �           2606    24823 *   quiz_feedbacks quiz_feedbacks_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.quiz_feedbacks
    ADD CONSTRAINT quiz_feedbacks_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);
 T   ALTER TABLE ONLY public.quiz_feedbacks DROP CONSTRAINT quiz_feedbacks_user_id_fkey;
       public               postgres    false    218    4749    234            D   4
  x��YY��F~�Eg6�$��x�zZ��c �6l���"�Rc�n��d���WM6����'{J3U_��ա0���ΞDwP���I�R���*�B�\�,��}�M�5}�ikڇ \,�"�Q�z��6"���j����n�{�*N�M�Ft�Z	[�B�m���x���򥺙�"z�,Kq�}#v/�u������Oƞ̽ ��S�0}�S��8�Fg�6UI]�ЊR�u�+���Eн|�z�H������> ��mN��/���VZ�����"W�l�J��!����.�����$���>�υ��A�>��ۈ�6;�����`�Z�׬�AKi{Թ"C�8��0<��m{�x�l�#dL����>S��6\0�������}ro�R��iui�J�ǟ]nfxz�㗙'�T@;�e:�<����ŀ��/j T�[���1V�=�`�'#��aO9�ļsb����Y^��^��o���������M�~/t�d���٪���-s:�����kz�`?�T���/}c[S�<�2�bzu�du�A�U���d,$c�+�B�H�iw�Ae��HZ�R���y���q��~]�31�^z!��ԽЭ-%e�ŵ�)��2c�����Ĩ��Ĥ��_��LL@� ��z(�5ʗ�YS<])K����o��3Ƽ��%0�֚Nf�`lP�6��`!�E�
o�1�|AӍr	��z��LL R �UM�N�VMk�,�ʡ�;��N�/s�"A(tS]���6�1%����׹�@㭐;�w��wm�2��\tǧm���b��
��Ԩ���h<�^��[$�D�C��g�F>�,�����^�2\~����T(��Ǖ4r�6F�mx5�Ąo=�G���� �d�m[x��h���`K,vk�i�T��Q�+�R}僵�F\����m&p�VV��D(���=w �%6�`�ILs��Y���<�ȁ����y���퍪��=`th7C+��}6\������{�-�@�:���R���H�L��`�p��`��,�q|�-M)���"����_����)��M��Ϸ����Ĥ&���=<�%�A}�����R����>vl�m�u���?����O��� a���׼����
џ��ď�!�e��C���I�_k�D�FA	���u"s�.�)�qƥ����68�J�D���ea��31�\9��I#�3"	�}��`�����Y�W.���N�P����Y��q��&1aZ;L�^���Ɔ�@gp@�$f��VS�c�w��?�C�7���e�IL��"X�����1MmL����4�'�'fpБS�	�%���86E�ڏ=q��t}e	>1ݡ�
���AL��IS�5E�������ch��4 o}�-ܜa�Cp�mc��NbR�@���������{w�I}*���E��AJ|��ۢs�|��A`�ۑKs���``ȴ�}�l�c��I�ܽz��O��Qc�(��ļ�Ʀg� �ۈ�Mk��Yl3Y��9��hw6�[m���5�R�vX���J�7�����AR_�B�l���/���9u����8d$L�Ĵ�/ ��/aB}� D���wGm���A��pD�j�Ԋd+��j�7}ۣ���y��fNS�l/�����8�{N'h��}����=�������`s�z�?܏S4fZ�ۓ�!k�o"?��s@'̹f&��D�q�;��;%�d�g��a�j ����5���|[K��w�$�V�y���ݾ����"�4����)O��ޓ�����*n,|`�4���3�1���ُ;:2�FVC/)1��xRH�)w��bҽ���tK�#�3�'Jk�ڡ��Q��e<1r��ILFW�(�Y��f��p�l�q"f�/eW�IL��A��iV�1MwboU;%e6P��Iy�IgD�!�����{U�����G��)�3B���A3UGl��w����RHz��tA �;��?�I���R���:}���R�iH�ǣ��ճ�%֗�`��&�{�;����Gb�]cOn�:i��jpy��%F!�~�ǃ�Gڦ�B�W��6]Ss�����4[nc��z1Y��⥃W�<��8������?A���gǌ4̴֑�2{�0�6��4�f��J]�t�j�=�p��F���t)��nSZ�Z� �r9���&^L`���!_Z�i�W�+��{2�0l�/Z>7í��Y^L�����"*�d�tB���ˀ���Y]V�̕o2���3ዻ��"[���[�jq���dnM���&h���J?�|�n��`��i~�ּa^@å�{2,��ݢ�R��q��8���߯5��ά���yi8��/螌)}̻ڶt��v��6�͋雋���$��������l������0�����]�ↇ{��dܖ����c���tGM���o���'�-:��_󌶾0�2���2V��u_�4)^6�M�.F���O��y�5?�����in��bB���V��?����s�b8��F�p'����M�0>gQ'����rX�����c}Y=�	!�QvÅ�]������;��;�rV>g�ۘ��^�=�z����Z=2      >   5
  x��XMs�8=;����ֈ�Hɶ��9��qR�ds�$�"�$� �e�i~�^���/��R��L�U)�&@�?^�~��$;�\렮��!�Mc���*�tWP�^��g��N��;�*���iz_��W�.���W��p�	X�>(=�Z򩞊���W��F���wU>ؖ����x�R]�Ο�!��r���v�</慝��K�)�;�����z}jO��[:Z]��uu�&隲d}���Z�%����ؔ�";���oO�G8y���Qk�~��^���7��@N����0]��*S���o�[��̶�T�X�2��������զ�)�W#��bK�<�5[AwԍiBD��T�����9�B�W���t�и��՝*l�cegB���:�3��8S��j�5��kS�);;4%r��`sv��v��{6M^��鮌�"E���u��wj�h�\%��#^�79�����)�o���|\��.׵��/8J���|�������й����R$YԦ���w��l��&�U�]�,�LW���O����6*�.��e��i��|�~�:Y�|$�舆�4"���nc�>׈ACycw�f�ڲ�/�99�.n������R�|}�������7/?=�J��+ɡN�u�6_����A��n،����bF҈I���،KtRY�M��W��z��$O�O�u�9K6�<�M��tU����G�t)?���x	��8���g*ƈ���H7�Z�$�V������@��*�;N����t�\.�X�;S ����N����6n�J�;R�{O1�:lD����M��a(��]p�1�a �<�=�<�5c7�g����k���Fq�&��vv��P�vO�%�	u��Ю���~�u�{Ԍj�� 5���Ѷ��E��Pr�ds���*-�֘[R�n��\�,0�!��4��'D"�qI�����ʍ-87SH���#,GE?����ºR��[0�He�m�:B��o	Vr3*�V������P�s0��K0�d.u�pL��9�ƴ�v��x�d�8��&�nt���$�?FR*��A�
>s9����������!�0�����Ca}9�fx:
1���\w����y�}� ��t�+B{���n���j�!������Z��(���y��q@�a_�p\y.É{�Gp�=�h��f_k�����p9�� ~j\,M��b�ա�"#�E��Vzj�}v�~p~�im�(�s�-WE�l�O�Ṕ�yI�ҐF��ɸ"��E,�ا:�ٚ�K�\Mϖ��hLz��9;8�c�x��-W���]	*l�gh�Br|���1�7m�dF4�� 5���oJqK�O̠�{�Bx�~s�2���x��(�a�8}�ApV�|)+l���p��� I��&��;H�QNXv��5�Rj����i�}� ���,��8�2��lL�����E�a;
V8=�?n����ڊ�*�!n��ߊ�u�A5�].7����?y1����ի^2�\��q��j)n����W��k�S��	�p7����W���ٰ2x��q�d�X@b��K޹���|���Ղ���&5nIb3K�hTC�O Tu���IGQK�vv��V1��i�\Er���d��tr�\�$ˊ�>]����c��g�8So(���L�e�J�w�x�Ԗ��#W������٩A�(#���H0Ra��O� C`ٱ�#� ��CK �ܪ���F�g�;	���	�l�U-�E��L���5 ���c�� �K*0A1AY)��-i+�a�s�r����h�rFNĐu�<!~�q����YαAX�z��1=�;ud|�>X|���ō�u� j�	�3i��1̇�v4�i�������{ƛ8<J�˅x Τ�B��J�㸨�db����c���9a�6�u�Jd\8��JKB�����`��Î��^i�����2�����Q�ƂQ���p�P��{i�T�x��B��e�%/�m�6�'���]�\K��0��$]���τ��^���I�Г,=����*٬h��˳M�������F��t
��A�@��\�h&9CY�ig(v�#��F�L�~_��	��(���~ �M?��z�2�vL�:"�oLD�̢\��ׇ���;�����+�U;�nQI�f��S��晝��$��=��������t'ǣ8&�>G`��H��� ,����qX<�q�cxl��	c�I���F&V��l�"q�!#6M\^H���bH�6:�7����{aZu�P�BP]F�[��)�Z$��B�s$1hW��X b�������N�Z}o�������[(<�;�؇#��@��k�c3��VY��RB�ĳ�����S�QVӏ�B虊�K?��
`R3�g'%6�腮Lo��)a��^o�{�R����v .#n7b	<�<JO�U�	*���s�9Wqh������1q4*�'��P�<�x9�H��J,�����֩1�Ə|�|�&-�a�_�䣅�!�)�����9`i��2��D� 3qKg,h�8�A����?�O�������/=�CT�����e��ٳ�Ũ�/      H   `  x�u��q�8D�r�Oy�?����^�q��	��UW�$~���U�r��WR��Tj�N�)��韔�&���+wf�U+o���E3y�zQ��}3�����.6\������v���lI̺MLw�ދ��2W�q��cх�~�紕ү�bϼ�����m�v��Y�I7L4�����`�Y��͖KH�2��y������E�ݱn����c�/| ����Z���o�0{jy~��$zr��Cf�&{K���jȾ2،�r�f<��~R	�%/�y�	��/�W����(Z���7nv��T�S��2Xb�L5�QiZI�	6p�����#�tg�O�����g�}��p>���گ/ع���5��l\�-x��L��47��ێ�V9:�d����D�F3�iu�V�u���Dx��i^4���2��B�5�q�Sk /0�r�q9٦2�[b���}�m;X�&��Q�i/�c�}������1V3�~
Ͻ���Q�>��<�|��l���2����c�m&���>p������Ω��7��|�m2�&]A�q��rn�����7���6� w2�x�"�Wc�*.�!�3��ܗ\:����o>)��%�Fu�VLW��;IʜsQ�~�l2�7��acv�2xɺ�ձ1�����%��uD�9H��K慽R�-~��K���1�m1(y���X�+�6e��±2����L겯�>woe����Wg�W]��g�B����$|�����9d�>K�x;�r���]���ge���ߩk��J�.��;_F*!O�>��^�9�Mګ1^�6�.ҧ�9?�k���s��fR��i��w��w��V�����d������Ɲ|��v��_;��۶5��4N�/�L�˕�+����=9+/����A��j���+0;�v����Fn�}��_���X�j7c�7����?Μ��<Ϝ�2�x���*ܐ��*���@}�\���O�vBo��~�d�g�}�^��j>=�>oG���s2�"���el1�;��.��H#�i��ل�]^��������ש�6S���9��w����j�N���%��F�������f�����z��S��B�����^J�\얳���������[P��      F   b  x���Kr� �|��;�� �9A�=A�?�0��d��~˟���@ ~�~����r�!�1~��s̞����ܒ?O�~��%6j�K̩J^��}��t��ZL�Xb����wх��@���a2����l:Qao��L0G-���L����	�,���%�F���BB��q�b5����{�UemDc��\�դ����Y�l��r�C�̈́�s�]$S��x̆tZ�8�~����Qo���v2Z,��0�>�e�^[�}���q���y)Q�^���طe��(#�>�Y�}2����F�c"���E�1=����Τ�����1�b��!֘�8b1�y=�m��E��      <   �   x�u�=k�0�g�Whl	.���ڷ��H��cU(������*mB��#�������(P�ȱ�P�$�J�1�	�>���_���|�>��M%"� F�[����x��t����o�cš$�����%�$��ks����}��M�����Vgi��}�{o�n�&D۶��`�"��������N�}��w{ޤ�ݑ?l��q�ab���� k�9���� w��� �P�a�Ur��j*ʳj��e�/B/�o      B      x��Z�s��,�����)͑(ɉ��M�Ռ�x,�if��I�p�3�#���}� �y��6�l���b��۷�[���J�Z�B��޶�0RW�^�`�R���=w���(U#]�T��KQ+U�����~g]I�Z�B
��AUB{ߪ��e#�(-�Pڿ���h/>��mk�gZ��K�|��d�]	o-�P�Zc?GOio���鰇�>���"�B��x��ʉ�ުc�d���Zz#l�h6��L���+z�����ݜ��8�R��\	O��18?-$��XY7�m.~��d+���N��1v���}�'�Ӛ��Ά5c�ک"��h=�Y��vW�Dp-���Í�[/W䇝ܓ�0K��i_]b9xj.ީn3���@�KY��rR�����jfb��Ù�k9X=��Yi~˓9���j&j����[�ps��2{�o�2����k)�2Z.��҅d�T*ll9��/dU/���9]c/�u����ذ��;�G;W��	��:�J��o�ƺ����,��O�/�.����������_��z���'�'��+��K���GQ:B��#�c��p�Ͱ�}cd�g�}L/�m�%�D�8��fϙEP���I�ro\�ƴ�u�7,���
�TMȣ�G�`���5 �8�ؘZ:�L4�+���
�w0 ���_��SW$"��vj^M}���G�ۖВ��;����'.c�3jw5����U���[i�y�n�F�aL��5%,K����6T�P�D}���$���R	�֊к��v�s�G禠d�k��F�G�s ��W�/�?� '�j<1�-��D"��~���Ƞ��Ҁ�2���dbt��W��9EkK$��r��"�#�ZF��t崪�SJ�L�177�D4�"P�a��o��Rn~��o8��-F�B[3���&� E~$���Y˯8ūx6��T,�4��b�����xu7\Z�I|�>��#��*o�A���'ϙ0"KZ�(�y�Y!�p�V�1f���
A�X��tu���92`$b��Hu{�%Y��J,k}"2�[��p��8��d��1IVx�]���m�,Tjږ��@��ʈo�|=�Q����};��9��҄r�+U��oP&�7I����0k�2�7�7��Ô<F�\���Ѩi��W����X��N�	�6�Tm/�2���a�S�z�#���z�I[k�|��,�%�f����3�F9.6,�v*��e��J�H~�������_��FE+������nļ(PT8���Zt��욉������0u*j��{��e舚Œp|�Q�_��D�lx��]b��cp ��JM��Qu�r
����bK�2/�B��]%��J��u����て���#��o���ڇ}|W��&,��5q��#_�,�O�8?��=��z�t�/�8=v��z6��(֧?�So���J�7��4C�l%��چ��+d��4����,�	P$�mk�K���Ư,%{���V���'f`ͬ����e���?_���ۋ�~޼:=��m����%BwXۂ��h�;]�ΪА�/P��2�x<��p
 #b���~_-��N�Z��6Ȟ����ϵzAE�����f��14�n]�H\0+q�m+�F �$�?h�P�e�AQ8}󷯿���ʯN�`�}�D�C��L�4 &�x���ő<�;��D��7�n(INƜűp�ɼA�,���u��܊�4������(��w��-��Xp�huqob!,!h<���/�h4��C��RV`S�vB}O�n�WA����!�V*#�D�E��o��8�X̨�˚74�U�q�N�:a(����X�p�P]]g�F\�������bpt+��$	��N����;���|BI9��)y���ARs�A��fj�zR�4ޠ��}CWH:e�7It��#�(rُ��>��U��C���BH*Vq�&6(zh-���������������X���Ԧ��KY�w؜B;�*ir2�Ė^�8���@4�z�/�<z&$��0-� 4��w-2��mV�B�̪&Dqޗ١L�S����[ǘ�3��ʧ�=�����HCU��Sa��sO��{JMN��-�A��~��D����J�+�SK�k0��rl�[����B*�1��edr0�˺��9P%��eY:"��kj�(׸��j����c&� tMe���v&�ҙ�E堹=�<qY�f�2��cIя���N�DT�G��ҟ�Eu7�
��W�@�	�Á!��h�R�h 3+jB\N���ŹX\�\\N�4�.������v��4hsۦ$�F�����n���QE��%EO��+�Y�!��ԏS���{��s���� �����uk���}�ۯI�Ezk�C���^�J%���xbo�G�6��PK�xHh�hT�6*�/:(v�\�E_h�7rQŮ��gg�f~C��U�  �:��Ɏ��n��S�~�>����}]h����aC�-B���o��n�uHtZ��ؿ�,��;���rqqsuq\m�ǀ��<�<��q�E��\�,Y�Q��UD1o�
��%8�T�"<ۊ��ؼOd�L�b�h�45i�̵m�0� �T�k�0눝T�{1�cy˷rk㴧�[<��E���Gυ4��F,��%�M��ɽ���4&vB�%e�X��(�g���F���G��a��f~�ȏI��O�@p1ւa��\�0��)�$ؗD9T��52$���+�p����ۻw"J.�"����S��Re(PښF����h��9��"�(���c.�͵kT�G�1\5�ؑ�k����s.^N�^t{BR0��~�'�,�S=M��ǈ�T�eRJJ��x�h.ԍ�8,�)��I��"�0�L"�y�4YL�4J�b�Wit��e�ukY�Y �� )���~��7W�i������211b����a\��*ל��2��r�)�L�����:r��sF�ʹ��"ϥ$��7g�]@&�y�,M>�mfyF� �G�x̜��h¸2r�k�ic2|�d�>�zT� �'�O�5M]Bz)N����_�\M�b~Lq_L�"W��Y��O��_x��sW�$ꗊ�2��ʨ*u�C�#>�o���0��(Á(��C��n}+y��3b�j����`e	���>{�|!�7��}���.N�@��*+<)6�4��fܿ������A-�O'ϗ��PG^r�\���=3%[��)c����Ho�spv��y�AɗVŝ��9�i:�WQ�0��$umql�f�)q�����4�zO7/�E�j_H��0ύh���GF;���	�o�FW'q=��$��-��&�\����j;���Lz����Gyw=�R�{�zq������R��H�F=�	Ce9����M(�\���'��4o�;�b�۩T�&j�wַ��$�e5�u&����a�,$nh�|�$��*���Q�v�����S���)�|�$��,���x�&#]_>8��|6�.$y��k��"ӻyByyK��B���4j�)���t�g7��P�c���y�����P����$���$
��S3�Ӂ����f�ҡc9Q��|q?24Iz7r����.�46��Q9|J�\������\�*<��.��Kp�3\��
3�Ys�!�Q-�5��?��%����k+���&{����\�.p�X�	Z�[k���I�K�;�엎��rρMT�b�}�FƏ���']G���-���fW�2��40����nr�_�g�o������J��ϐ\R�k�P#?0�^�8N��n.��U~L�s��Cʮ��d �V�ڙ.g��m�kql�����FS �=F��V�6���������8;��M3ɮ�z�nV���@����y �}�2=*t�#_�G�`0'מ��g~mwg��˩i�Wi?�1��op�8�3��H��0&��Ω���ߩANw��#^���裰���9�d8{A/v&'���[q�3LZS��H��w�=bT���|����SM8��P�WQ��Sz0����������ľ�{5��$�S�~���})Me7����N_˭^Ӧ��Ve�5�Bx��>N��p'���������'���]�ym��1�׈ +   ��������H��V�7�Q�R��7�W���q~�?y�俚�-n      J   O   x�3�4�4�t��K�4202�50�56P00�21�25�60�%��e�ih�\ZR	UD
�FVF�V����@�1z\\\ ��      @   �   x�u�=o�0�g��O �Je�Z�ꍷ��8��U����:t�����k���ɭ��31b"���wuYH��
(43�bŻL�5���EA�����eAH(e�.!g䠽aK�A�Д�z��Nܗ�EI�s	�Y����%YbYp�pC�Q��~q:t"�L%��;r>�{,	���-ӍV�{[��M�7���~4�S���Cc{0�x~�p�Lu}��m]�?vo1      :   7  x�}�Ms�L�ם_�"����lVA&1����ʆH�% � ��IM2F�W��n?}�
 ��"�x�CE\��2�ܣ�{���/���m[պbs�L~����7���E��u�4>���lZ2�]�)�ҀW�;G�8$�9z�D*�U���kYRE���j�A�����!H�(a���2�kP��S�UC�F&m4��Y�Z��2����H�Dﵮ(�>B=(���B�Χ�TN�A�(�%p�"r�#)��v7\��<D'�ŮTV�?e��K19���1IH��v>ͼPf��6���o����9؇���W䢊$��!���*����O%'	!��d�,*o�gY���N���� �	�H13�e���[/�4��®sG;g9�k�:-� ��U�W�O� S^���B!}H�%��l.�0O'�ED��\�1n�e^~��\��FN�弚��������)��G����>R.x9�sL���q�2m��W��q� 7���O;���,q����q`B<�Gc�`��������2
M�b@BNQ��J��>D�\Cܥ�2��%ڧ,H�Ȋ*|dw��n�a�s��@���	��,J�i'�����Ɍw��A�T�j�=�4�1��3K�c���H���!�b�v�:� S\�3xf��FU-�'��gc]��1*̦t�iņ1��u����K$q=U�S���;0�����W�W�?��p�]@���}�c��+���[ ��4��S���?U�� aה����ZL��o9��B߼�gk�Z+d?U+�u� �D��Gi&/w*�#����>��Շ��N�2www Փ�     