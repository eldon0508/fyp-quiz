PGDMP  -                    }           fyp-quiz    17.4    17.4 M    M           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
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
          public               postgres    false    231            �            1259    24757    attempts    TABLE       CREATE TABLE public.attempts (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    quiz_id bigint NOT NULL,
    question_number integer NOT NULL,
    question_correct bigint,
    vulnerability_rate integer,
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
    public               postgres    false    228   zb       >          0    24715    articles 
   TABLE DATA           �   COPY public.articles (id, category_id, title, subtitle, authors, url, image, image_extension, published, content, created_at, updated_at, deleted_at) FROM stdin;
    public               postgres    false    222   �l       H          0    24775    attempt_questions 
   TABLE DATA           �   COPY public.attempt_questions (id, attempt_id, question_id, selected_answer, best_answer, created_at, updated_at, deleted_at) FROM stdin;
    public               postgres    false    232   �q       F          0    24757    attempts 
   TABLE DATA           �   COPY public.attempts (id, user_id, quiz_id, question_number, question_correct, vulnerability_rate, completed, created_at, updated_at, deleted_at) FROM stdin;
    public               postgres    false    230   �q       <          0    24706 
   categories 
   TABLE DATA           _   COPY public.categories (id, name, description, created_at, updated_at, deleted_at) FROM stdin;
    public               postgres    false    220   9r       B          0    24738 	   questions 
   TABLE DATA           d   COPY public.questions (id, question_text, feedback, created_at, updated_at, deleted_at) FROM stdin;
    public               postgres    false    226   �r       J          0    24817    quiz_feedbacks 
   TABLE DATA           l   COPY public.quiz_feedbacks (id, user_id, quiz_id, feedback, created_at, updated_at, deleted_at) FROM stdin;
    public               postgres    false    234   �       @          0    24729    quizzes 
   TABLE DATA           \   COPY public.quizzes (id, name, description, created_at, updated_at, deleted_at) FROM stdin;
    public               postgres    false    224   6�       :          0    24693    users 
   TABLE DATA           �   COPY public.users (id, role, username, password, firstname, lastname, dob, active, last_attempt, created_at, updated_at, deleted_at) FROM stdin;
    public               postgres    false    218   ��       Z           0    0    answers_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.answers_id_seq', 64, true);
          public               postgres    false    227            [           0    0    articles_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.articles_id_seq', 2, true);
          public               postgres    false    221            \           0    0    attempt_questions_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.attempt_questions_id_seq', 18, true);
          public               postgres    false    231            ]           0    0    attempts_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.attempts_id_seq', 3, true);
          public               postgres    false    229            ^           0    0    categories_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.categories_id_seq', 3, true);
          public               postgres    false    219            _           0    0    questions_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.questions_id_seq', 16, true);
          public               postgres    false    225            `           0    0    quiz_feedbacks_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.quiz_feedbacks_id_seq', 1, true);
          public               postgres    false    233            a           0    0    quizzes_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.quizzes_id_seq', 1, true);
          public               postgres    false    223            b           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 6, true);
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
���AL��IS�5E�������ch��4 o}�-ܜa�Cp�mc��NbR�@���������{w�I}*���E��AJ|��ۢs�|��A`�ۑKs���``ȴ�}�l�c��I�ܽz��O��Qc�(��ļ�Ʀg� �ۈ�Mk��Yl3Y��9��hw6�[m���5�R�vX���J�7�����AR_�B�l���/���9u����8d$L�Ĵ�/ ��/aB}� D���wGm���A��pD�j�Ԋd+��j�7}ۣ���y��fNS�l/�����8�{N'h��}����=�������`s�z�?܏S4fZ�ۓ�!k�o"?��s@'̹f&��D�q�;��;%�d�g��a�j ����5���|[K��w�$�V�y���ݾ����"�4����)O��ޓ�����*n,|`�4���3�1���ُ;:2�FVC/)1��xRH�)w��bҽ���tK�#�3�'Jk�ڡ��Q��e<1r��ILFW�(�Y��f��p�l�q"f�/eW�IL��A��iV�1MwboU;%e6P��Iy�IgD�!�����{U�����G��)�3B���A3UGl��w����RHz��tA �;��?�I���R���:}���R�iH�ǣ��ճ�%֗�`��&�{�;����Gb�]cOn�:i��jpy��%F!�~�ǃ�Gڦ�B�W��6]Ss�����4[nc��z1Y��⥃W�<��8������?A���gǌ4̴֑�2{�0�6��4�f��J]�t�j�=�p��F���t)��nSZ�Z� �r9���&^L`���!_Z�i�W�+��{2�0l�/Z>7í��Y^L�����"*�d�tB���ˀ���Y]V�̕o2���3ዻ��"[���[�jq���dnM���&h���J?�|�n��`��i~�ּa^@å�{2,��ݢ�R��q��8���߯5��ά���yi8��/螌)}̻ڶt��v��6�͋雋���$��������l������0�����]�ↇ{��dܖ����c���tGM���o���'�-:��_󌶾0�2���2V��u_�4)^6�M�.F���O��y�5?�����in��bB���V��?����s�b8��F�p'����M�0>gQ'����rX�����c}Y=�	!�QvÅ�]������;��;�rV>g�ۘ��^�=�z����Z=2      >   �  x�}U�r�6<�_1�$QJ�%���6���V��/ 9$�  M떏��K�J~�f}qY0���=��6��\�����і�k��ۇ�(��^?�Q>�/l���M�l��1��j��qQz7V!z}ǋ�uK����`����l�Z/Cʓ�S��l�;�pX"�.��ּ[�Y������:�mx�U��]����b���of�O<��t ei�
��(��;���Tq(�.�t���x WSB�bT�]�.����u�5�D| ��~�FE�a�&m�9�;I�$��\��pvN�P���t�t���(�����\\���rB5:G�J�����JY0�u=�DB�@N*Ի�}=�\��)|�SʖT�G��r�<Sլ����{4Lh	��6	�VyD��H(��zBX+����Q^��ڀ���x�$,n����e2�B���6E���W�<�W�� 5��	 n��iO} Z�jK���4�����!z��A>���TfT�@��;[-���c�'¸�#'�
xQ��&^ZouӚH�.�@*Ѓ�c�j�дD�+���!��3d	����]�{Wsh3�q�ɜ��5�oԺ��P��B��� Y&�T��)e-R���3 �	�c�T Jo�eLx9�j\�&�'M(�1G. '�}�^i`�D��7R.������~�S�� W,�I_�؉Eq
��m0���Uh#HX���^#ր!,���a*�ن�@k� �Q	 �r��_hO5����%r�uL����?iҸMK�Bd��RQ-f�*?�V�,�S�_mVW���W��}�}���?eP]��{L##U��"��� ,}�.r�AԱ�:�a6=jeg-�
�9��JG�0�:��Oh{
���T�K9.f77?�{_(������iԗ�<ߚ��v{�\�5+U_�����l{�.3�Y]d����,w�����OQt��|��o��|��T-��t�P׺��ᅔ%'�"�B�b�C���&2&}�W�S=��C���
�4&��(�Zm�<x�`@T.̀_�hT֏M#'�����<C�!�e$��u����ِ���b�*]	��NV&Ȗ��`��)�tN4��bF�_b[���>�T�!�T~��(��elc��a:t�o���nyۡ�o�q�R�j�K+p�iZ>�Rc�آ�E�����g*{i���j���/��U~~�������?��0�      H   S   x�u���0�w2T�8J��	����Zd�,�eq�����ɱ�����7�[������k��R�%8:�ʚ���CUQ8!W      F   ;   x�3�4�4�4B�N##S]c]c+#C+#ma#�Xؐ3Ə+F��� �d�      <   r   x�3��I,c##S]c]#KCK++mtaC+�p��gHjrF^~N~z%2I��������)�A��@��9�+�R��S�K�2K*ѹ�:��1������ �2�      B      x��Zے�}^�d��
�ڛdk__rQ�c�,)N��΀$jgc C����� �Br�U��vg@�/�Ow��ſm_8]j�Ӆj�(Se�Lc�Mq��+V�}(TYھ�V�b�u[���m���H+�`��)�������vf}��U:��,~ڪPTV�T�Oo��?��c�"�W���M8p#�j7��EˡN�������-%P!���+]�w��Fׇ�T=��}a��~�f�6w�w4�C�t@�/u�y۪�0�ںF��������
{ŋ}��s�ﱠ�}����[��B&g��a�a��,@��Vr��z��^���&�4o6�����!�hf"˲�Qw����l���� ��f�׮�k�~㋪��O�W{�VډJ5�w��;����+W�������c�w�h�;�B�E�𗍵��- %^lm��z��e�*� Ф��3G]o(�Z�jx�w^��|�2r�R��ĵ��z/�)Z�oEp=$���oV����õ `�7&�F��e�m�9h��{��Z�eّ�U�7���Ψl-8>àQm��������gW7��\7��׷��/�xu��~v󲸹��{q������G7�m�m��b���q�,�����fj��պJ^�)���E��wP�?@!M��ߞ�������%��-"GC��:��bEMu�F+5�;Q�Z;�L�^������E�0�:��z�Wo��; ~��zf-��x~ڲ�2b��}���A���7r<mE����
~��0:�^澇s�`M�Ͻ��ab�g����<X)��q`����t��!��뵑��<�s�(���F��#���w������A@Ob�P�NȅL��ak+A'_�����DH���%�(�Z9@)�P���=��h
��1��}�uօ��4��_����Qv+�sm������**c:��r�qc�����Z�9p�F>F��&nCp���D]io�7�ˣxP�u���x�F�~3�c@Ir�5*q� �� �-8f!�Ձ[��L������P�e�U#1h�+��q4����e�MΣ𶧷���ɒ�޸��D��{�e���[3/�������'�h��U���1*�M~���bԮTPO�1�w�Fǰ�0gjBZod�hI�y���2���D�œ:���H��>Lc":~�?�袟����G�����#0������hA���08����*.�΀g\f�8��V�nH�d#"��N�N�*���O~+}?��i[���\$Od�S�����q�#r�t�^O�N��gߟ�gĤ ��bf7ϑ0�)�j[��J�K��C�.�!sD�İ1R��R+J��JLkc �;�X�@r.�~GV��)O"r� F�E��<g��U��2��-�T]|���%��t̤���K����P�������C������V��b�C��������8d&�2�/@�����m]�=��_:���v8L1ڑe9v{�Gm�>�s�L(���H��`�T�Y�K^����ٗj&�$�y8�"�qX,��:�e;��X��j�FF�������~bļ)��t���u0�5Gע�K��!=��:�V<���6�����8>娷�_��"�?<g�!�q���S���J��"���b�贒�F+o�|�:	����B���T(~����>���zp5<�AW'^|wsRwLË_<�����PB��M>�㌾������嗯�S?�?_*� Q�]��5��k\�J��U�_�!�C�<B'���w�ĝ��4ye�DS�\����� ZP���;����p������//�o/Oub;Q�������x�xgZ����]�=���o�� ""���C��lP\���[�5��~g�o��L��?�
"&����Ct�2�F��Y�!���B8Y���5��������������%<X��@߯`���dĝJ��'����愈L�?��ק�q�D���`�Q���\������Ӏ6�^���FH��e�soʇ:&�
�ƃ0I
�2��u{ȐT�h
��I����pVI _K~��U�Vk]\zPl�̨��9\�r`X
O(�� �����J#A¼���ͰR�3iڈ )c�u�d��{!�S�o���I�O/���v
��1�6��T��Z�lT�{x��b�B�#�$����O4��(i?R��Y��>ʲ��֟T2!Y���ڑMl��PZdF��9���g�?����/.�n���M8q�U��g"�'�v�V�m����/<c�����p �r"�nC�*��E�=�ۢ�*Vȃ�����V�M�1��qOS�Lo������H&q�WR�g*�}f8#X�ŒVc��M�YWmjC9*(��;�3 Xc�&1û-q5�u�M-�m@�i"�@����e�D���	wZ5�z��9B�j�����6lɎh��A�!;�
�	5����"%�����?�������S��5_^���e.X.?�U���C��Wp,����A\��:nW�I�')�c���N��`�2Q���HF�<�X� ���]w�W�,�ƾ�m*����x#�D����ph�K�*9�-T�(5��ٯ�Y�2OSW{u�qW�n�6%�T�z�F,�E��Y'��*b�>z�T�P٩c�Ap�1�c8����9T����aD�B�R�X�������C�A'_M���7y���iG~|����,�!���?����Qմ�з��H�LC�����L+�Mڡ��R�Φ2��l�&4�Hߨڱ�Nȹ,�93{��V+�u��Uxl7IfM]�T���$����s
ƴrRD���E"�9�Z,��m��i&C&�]�%�t�s<�Y�n��T8�0�|O������";<fp\_|9�L�����/��ZW	��G[�x��)��E$cU��#G�=�lu/�,s�Dr��XKP�$���ei�^��ϛ�l>:G�RlG�k��ǹ?����`�A>*U��g�P�h!��g�tb����s����7�AQ�x��� 9�����+u�ǭb�L�u����䊏��cp��T<'�	)�&|���W�u1S�-G~l,=t��v>���|�4�P���������f������u_O

!��M���p����sG�2���c�Y߃�g���C��L�Ff'�cg��p40���xr�qLo��,'�0��h�4��=��hJ�;]}dLS�q��q Q��|z1��\d�U�<�B�r��+yC�����������%J�i☣�H�v�s�Z%�&qq�'q��<K}>���ۑ�����Ij8t��y���r2��Dƶ�$(�T��ᯒ���V�_<,ե��x���LK-�Y��pP�C�$$6�m8%;J�5�7�WC,�955I������F1�ę��e�п���S��J����ס�IfT���-�W���=�i��������/N�����G͏�ǳ�4��	Q��c�D��v���y�SrƼ;0D��h�g�J���@��ʔo&h��>8)�<;dR.I�&�2@9tJt.SM3N�� ����'��DR�tb&M��iY�01���4�2ͬL�sZ2N�&�f���P4����6u{cI ڴ;[�8�n�z�w�D��2`:'1l��Co~�B�g����'	��i��;�IsHZ٥�&5�Ô������'�Y��1ڲ���;N�}v�c��AR��5
k��4x>��>Ǯ�c�s	2�!�R@1@�㌊��˹8�U������Ѐ�陬�3��mm0�	{�vmmU��1ws
4$]�-�ӌ����{�� ���?��T�3]�'�`�!$U��|�����0����א^���H���M� �@��D%ƤP���̲��Tq�vlY1b�W��/Hf"������|q9Q�Q�F�e�y$҆a�--����"��V�`�_+�5�>��a7Bp�I�"��jjS�~��c]'����T"�)O?a�~��&Ǵ�� s3�C�3��i�`?�Hᑢ�44&_u� �P8���O ��$/��ܯ�tR\��́[���/LX #   B#�vk���9��/��� N~����>�/�-n      J   3   x�3�4�4�t��K�4202�50�56P00�21�25�60�%������ ��)      @   k   x�3��O�L�Qp�K��KM-��K�"��P��Y�PX�Y� ���RSJ�K2��*J�
�S��r*�8��Lu�u�,������M��[��c��b���� vL(@      :   �   x��λ�@�z�

:���Vj����JcB�+�h�Я�M,���-n1s��o���Ϛ�[�=X�[�V�NސЫ�:k:����q�.��O���b��Y{A���s�m}R0�f��AvM�%��c�;G��()���*#�v���6EZ2-�2I�_�&�s�ęIZ�H����a| `�O�     